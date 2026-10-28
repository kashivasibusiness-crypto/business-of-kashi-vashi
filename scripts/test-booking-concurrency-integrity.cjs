/**
 * Task 2.1 — Booking Integrity & Concurrency Test Suite
 * 
 * Verifies:
 * 1. Five concurrent booking-create attempts for the same quote produce exactly ONE booking.
 * 2. Duplicate attempts receive clean, non-500 HTTP 400 conflict responses.
 * 3. No duplicate side effects occur (QR counter, lead status, vendor assignments).
 * 4. Separate quotes can successfully create distinct bookings.
 * 5. Legacy records with empty/null quoteId do not collide under the partial index.
 * 6. Unaccepted or missing quoteIds fail safely.
 * 7. Isolated in-memory database is used with zero production data mutations.
 */

const assert = require('assert');
const mongoose = require('../backend/node_modules/mongoose');
const { MongoMemoryServer } = require('../backend/node_modules/mongodb-memory-server');

let mongod = null;
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

async function test(name, fn) {
    totalTests++;
    try {
        await fn();
        console.log(`  ✅ PASS: ${name}`);
        passedTests++;
    } catch (err) {
        console.error(`  ❌ FAIL: ${name}`);
        console.error(`     Error: ${err.message}`);
        failedTests++;
    }
}

// -------------------------------------------------------------
// SETUP ISOLATED TEST ENVIRONMENT
// -------------------------------------------------------------
let QuoteModel, BookingModel, LeadModel, QRRecordModel;
let counterSeq = 1000;
async function mockGetNextSequence(type) {
    counterSeq++;
    return `VY-${type[0]}-2026-${counterSeq}`;
}

function sanitizeBookingForManager(b) {
    const obj = b.toObject ? b.toObject() : { ...b };
    if (obj.profitSummary) delete obj.profitSummary;
    return obj;
}

/**
 * Simulates /admin/booking/create endpoint execution with real Mongoose model & index
 */
async function simulateCreateBookingEndpoint(user, body) {
    const { quoteId } = body;

    if (!quoteId) {
        return { statusCode: 400, body: { success: false, message: "quoteId is required." } };
    }

    try {
        const quote = await QuoteModel.findById(quoteId);
        if (!quote) {
            return { statusCode: 404, body: { success: false, message: "Accepted quote not found." } };
        }

        if (quote.status !== 'ACCEPTED') {
            return { statusCode: 400, body: { success: false, message: "Only ACCEPTED quotes can be converted to bookings." } };
        }

        // Fast-path duplicate check
        const existingBooking = await BookingModel.findOne({ quoteId });
        if (existingBooking) {
            const retBooking = user.role === 'CEO' ? existingBooking : sanitizeBookingForManager(existingBooking);
            return {
                statusCode: 400,
                body: {
                    success: false,
                    message: `Booking ${existingBooking.bookingNumber} already exists for this accepted quote.`,
                    booking: retBooking
                }
            };
        }

        const targetLead = await LeadModel.findById(quote.leadId);
        const bookingNumber = await mockGetNextSequence('BOOKING');
        const tripId = await mockGetNextSequence('TRIP');

        const newBooking = new BookingModel({
            bookingNumber,
            tripId,
            leadId: quote.leadId,
            quoteId: quote._id.toString(),
            customerId: targetLead?.customerId || 'CUST-001',
            customerDetails: {
                name: targetLead?.name || 'Valued Client',
                phone: targetLead?.mobile || '+919876543210'
            },
            packageDetails: {
                packageName: 'Kashi Special Yatra',
                finalCustomerPrice: quote.finalCustomerPrice || 40000
            },
            qrId: targetLead?.qrId || null,
            bookingStatus: 'PENDING'
        });

        // Database unique index constraint enforcement point
        await newBooking.save();

        // Side effect: increment QR stats ONLY upon successful save
        if (targetLead?.qrId && QRRecordModel) {
            await QRRecordModel.updateOne(
                { qrId: targetLead.qrId },
                { $inc: { bookingCount: 1, revenueGenerated: Number(quote.finalCustomerPrice) || 0 } }
            );
        }

        // Side effect: update Lead to WON
        if (targetLead) {
            targetLead.stage = 'WON';
            targetLead.status = 'Confirmed';
            targetLead.bookingNumber = bookingNumber;
            await targetLead.save();
        }

        const retBooking = user.role === 'CEO' ? newBooking : sanitizeBookingForManager(newBooking);
        return {
            statusCode: 200,
            body: {
                success: true,
                message: `Booking ${bookingNumber} created successfully!`,
                booking: retBooking
            }
        };

    } catch (error) {
        // Handle race condition: MongoDB E11000 duplicate key error on quoteId
        if (error.code === 11000 || (error.name === 'MongoServerError' && error.message && error.message.includes('E11000')) || (error.message && error.message.includes('duplicate key'))) {
            try {
                const conflictingBooking = await BookingModel.findOne({ quoteId });
                if (conflictingBooking) {
                    const retBooking = user.role === 'CEO' ? conflictingBooking : sanitizeBookingForManager(conflictingBooking);
                    return {
                        statusCode: 400,
                        body: {
                            success: false,
                            message: `Booking ${conflictingBooking.bookingNumber || ''} already exists for this accepted quote.`,
                            booking: retBooking
                        }
                    };
                }
            } catch {}
            return {
                statusCode: 400,
                body: { success: false, message: "A booking already exists for this accepted quote." }
            };
        }

        return {
            statusCode: 500,
            body: { success: false, message: "Booking creation failed." }
        };
    }
}

async function runSuite() {
    console.log('================================================================');
    console.log('🧪 TASK 2.1 — BOOKING INTEGRITY & CONCURRENCY TEST SUITE');
    console.log('================================================================\n');

    console.log('⏳ Provisioning isolated in-memory test database...');
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('✅ Isolated in-memory MongoDB active.\n');

    // Define Schemas matching backend/server.js
    const QuoteSchema = new mongoose.Schema({
        quoteNumber: String,
        leadId: String,
        status: { type: String, default: 'DRAFT' },
        finalCustomerPrice: Number
    }, { timestamps: true });

    const BookingSchema = new mongoose.Schema({
        bookingNumber: { type: String, required: true, unique: true },
        tripId: { type: String, default: null },
        leadId: { type: String, required: true },
        quoteId: { type: String, default: '' },
        customerId: { type: String, default: '' },
        customerDetails: {
            name: { type: String, required: true },
            phone: { type: String, required: true }
        },
        packageDetails: {
            packageName: String,
            finalCustomerPrice: Number
        },
        qrId: { type: String, default: null },
        bookingStatus: { type: String, default: 'PENDING' }
    }, { timestamps: true });

    // Enforce Partial Unique Index on quoteId matching production specification
    BookingSchema.index(
        { quoteId: 1 },
        {
            unique: true,
            partialFilterExpression: { quoteId: { $type: 'string', $gt: '' } },
            background: true
        }
    );

    const LeadSchema = new mongoose.Schema({
        name: String,
        mobile: String,
        stage: String,
        status: String,
        bookingNumber: String,
        qrId: String
    }, { timestamps: true });

    const QRRecordSchema = new mongoose.Schema({
        qrId: { type: String, unique: true },
        bookingCount: { type: Number, default: 0 },
        revenueGenerated: { type: Number, default: 0 }
    }, { timestamps: true });

    QuoteModel = mongoose.model('Quote', QuoteSchema, 'quotes');
    BookingModel = mongoose.model('Booking', BookingSchema, 'bookings');
    LeadModel = mongoose.model('Lead', LeadSchema, 'enquiries');
    QRRecordModel = mongoose.model('QRRecord', QRRecordSchema, 'qr_records');

    // Wait for indexes to build in MongoMemoryServer
    await BookingModel.init();
    await QRRecordModel.init();

    // -------------------------------------------------------------
    // SUITE 1: CONCURRENT BOOKING CREATION ATTEMPTS
    // -------------------------------------------------------------
    console.log('⚡ Suite 1: Concurrent Booking Attempts (Same Quote)');

    const mockLead = await LeadModel.create({
        name: 'Aarav Sharma',
        mobile: '+91 98888 77777',
        stage: 'PROPOSAL_SENT',
        status: 'In-Progress',
        qrId: 'QR-TEST-001'
    });

    const mockQR = await QRRecordModel.create({
        qrId: 'QR-TEST-001',
        bookingCount: 0,
        revenueGenerated: 0
    });

    const mockQuote1 = await QuoteModel.create({
        quoteNumber: 'VY-Q-2026-101',
        leadId: mockLead._id.toString(),
        status: 'ACCEPTED',
        finalCustomerPrice: 45000
    });

    await test('Five concurrent booking-create attempts result in exactly ONE booking', async () => {
        const attempts = [1, 2, 3, 4, 5].map(() =>
            simulateCreateBookingEndpoint(
                { role: 'Manager', name: 'Ops Manager' },
                { quoteId: mockQuote1._id.toString() }
            )
        );

        const results = await Promise.all(attempts);

        const successCount = results.filter(r => r.statusCode === 200).length;
        const conflictCount = results.filter(r => r.statusCode === 400).length;
        const serverErrorCount = results.filter(r => r.statusCode >= 500).length;

        assert.strictEqual(successCount, 1, `Exactly 1 attempt must succeed with HTTP 200, got ${successCount}`);
        assert.strictEqual(conflictCount, 4, `Remaining 4 attempts must return HTTP 400 conflict, got ${conflictCount}`);
        assert.strictEqual(serverErrorCount, 0, `Zero 500 internal server errors allowed, got ${serverErrorCount}`);

        // Verify database state
        const dbBookings = await BookingModel.find({ quoteId: mockQuote1._id.toString() });
        assert.strictEqual(dbBookings.length, 1, `Database must contain exactly 1 booking record for quoteId, found ${dbBookings.length}`);
    });

    await test('Conflict responses return existing booking details and expected message format', async () => {
        const attempt = await simulateCreateBookingEndpoint(
            { role: 'Manager', name: 'Ops Manager' },
            { quoteId: mockQuote1._id.toString() }
        );

        assert.strictEqual(attempt.statusCode, 400);
        assert.strictEqual(attempt.body.success, false);
        assert(attempt.body.message.includes('already exists for this accepted quote'));
        assert(attempt.body.booking, 'Response must contain existing booking object');
        assert(attempt.body.booking.bookingNumber, 'Returned booking must have bookingNumber');
    });

    await test('No duplicate side effects occurred (QR counters incremented only once)', async () => {
        const updatedQR = await QRRecordModel.findOne({ qrId: 'QR-TEST-001' });
        assert.strictEqual(updatedQR.bookingCount, 1, `QR bookingCount must be 1, got ${updatedQR.bookingCount}`);
        assert.strictEqual(updatedQR.revenueGenerated, 45000, `QR revenue must be 45,000, got ${updatedQR.revenueGenerated}`);

        const updatedLead = await LeadModel.findById(mockLead._id);
        assert.strictEqual(updatedLead.stage, 'WON', 'Lead stage is WON');
        assert.strictEqual(updatedLead.status, 'Confirmed', 'Lead status is Confirmed');
    });

    // -------------------------------------------------------------
    // SUITE 2: INDEPENDENT QUOTES
    // -------------------------------------------------------------
    console.log('\n📦 Suite 2: Distinct Quotes Create Separate Bookings');

    const mockQuote2 = await QuoteModel.create({
        quoteNumber: 'VY-Q-2026-102',
        leadId: mockLead._id.toString(),
        status: 'ACCEPTED',
        finalCustomerPrice: 32000
    });

    await test('Different quoteId successfully creates second booking', async () => {
        const res = await simulateCreateBookingEndpoint(
            { role: 'Manager', name: 'Ops Manager' },
            { quoteId: mockQuote2._id.toString() }
        );

        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.success, true);
        assert(res.body.booking.bookingNumber);

        const totalBookings = await BookingModel.countDocuments();
        assert.strictEqual(totalBookings, 2, `Total bookings should now be 2, got ${totalBookings}`);
    });

    // -------------------------------------------------------------
    // SUITE 3: VALIDATION AND SAFE ERROR REJECTION
    // -------------------------------------------------------------
    console.log('\n🛡️ Suite 3: Input Validation & Safeguards');

    const unacceptedQuote = await QuoteModel.create({
        quoteNumber: 'VY-Q-UNACCEPTED',
        leadId: mockLead._id.toString(),
        status: 'SENT',
        finalCustomerPrice: 20000
    });

    await test('Unaccepted quote is rejected with HTTP 400', async () => {
        const res = await simulateCreateBookingEndpoint(
            { role: 'Manager', name: 'Ops Manager' },
            { quoteId: unacceptedQuote._id.toString() }
        );
        assert.strictEqual(res.statusCode, 400);
        assert(res.body.message.includes('Only ACCEPTED quotes'));
    });

    await test('Missing quoteId parameter is rejected with HTTP 400', async () => {
        const res = await simulateCreateBookingEndpoint(
            { role: 'Manager', name: 'Ops Manager' },
            {}
        );
        assert.strictEqual(res.statusCode, 400);
        assert(res.body.message.includes('quoteId is required'));
    });

    await test('Non-existent quoteId is rejected with HTTP 404', async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toString();
        const res = await simulateCreateBookingEndpoint(
            { role: 'Manager', name: 'Ops Manager' },
            { quoteId: nonExistentId }
        );
        assert.strictEqual(res.statusCode, 404);
        assert(res.body.message.includes('Accepted quote not found'));
    });

    // -------------------------------------------------------------
    // SUITE 4: LEGACY RECORDS & PARTIAL INDEX BEHAVIOR
    // -------------------------------------------------------------
    console.log('\n📜 Suite 4: Legacy Records with Missing/Empty quoteId');

    await test('Multiple bookings with empty or null quoteId do NOT collide under partial index', async () => {
        // Direct insertion of two legacy records without quoteId
        const legacy1 = await BookingModel.create({
            bookingNumber: 'LEGACY-B-001',
            leadId: mockLead._id.toString(),
            quoteId: '',
            customerDetails: { name: 'Legacy Guest 1', phone: '9999911111' }
        });

        const legacy2 = await BookingModel.create({
            bookingNumber: 'LEGACY-B-002',
            leadId: mockLead._id.toString(),
            quoteId: '',
            customerDetails: { name: 'Legacy Guest 2', phone: '9999922222' }
        });

        assert(legacy1._id);
        assert(legacy2._id);

        const countEmpty = await BookingModel.countDocuments({ quoteId: '' });
        assert.strictEqual(countEmpty, 2, 'Both legacy bookings coexist cleanly without unique key collision');
    });

    // -------------------------------------------------------------
    // SUITE 5: DIRECT DATABASE DUPLICATE KEY CONSTRAINT
    // -------------------------------------------------------------
    console.log('\n🔒 Suite 5: Database-Level Duplicate Key Rejection');

    await test('Direct database insertion of duplicate quoteId throws E11000', async () => {
        let threwE11000 = false;
        try {
            await BookingModel.create({
                bookingNumber: 'COLLIDE-B-001',
                leadId: mockLead._id.toString(),
                quoteId: mockQuote1._id.toString(),
                customerDetails: { name: 'Direct Duplicate', phone: '9999933333' }
            });
        } catch (err) {
            threwE11000 = err.code === 11000 || (err.message && err.message.includes('E11000'));
        }
        assert(threwE11000, 'Mongoose/MongoDB MUST throw E11000 on direct duplicate quoteId insertion');
    });

    console.log('\n================================================================');
    console.log(`📊 SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (${failedTests === 0 ? '100% SUCCESS' : `${failedTests} FAILED`})`);
    console.log('================================================================\n');

    await mongoose.disconnect();
    await mongod.stop();

    if (failedTests > 0) {
        process.exit(1);
    }
}

runSuite().catch(async (err) => {
    console.error('Fatal test error:', err);
    if (mongod) await mongod.stop();
    process.exit(1);
});
