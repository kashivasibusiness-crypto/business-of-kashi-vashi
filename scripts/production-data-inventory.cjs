/**
 * scripts/production-data-inventory.cjs
 * 
 * Production Data Hygiene Inventory
 * Scans active MongoDB collections and classifies candidate records using multi-signal heuristics:
 * - CLEAR_TEST: Definitive test record (e.g. example.com, 9999999999, 'Test Lead', TEST-QR)
 * - LIKELY_TEST: High-probability test record (e.g. test keywords in internal notes or remarks)
 * - UNKNOWN: Ambiguous record requiring manual business review
 * - REAL_DATA: Legitimate customer, booking, or protected system account
 * 
 * ZERO DELETIONS PERFORMED. Read-only inventory.
 */

const path = require('path');
const fs = require('fs');

// Resolve mongoose and dotenv from backend
const mongoose = require(path.join(__dirname, '../backend/node_modules/mongoose'));
const envPath = path.resolve(__dirname, '../backend/.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const val = match[2].trim().replace(/^["']|["']$/g, '');
            if (!process.env[key]) process.env[key] = val;
        }
    });
}

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/varanasi_yatra';

// Sanitize URI for console output
function sanitizeUri(uri) {
    if (!uri) return 'N/A';
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
}

// Multi-signal heuristics
const CLEAR_TEST_EMAIL_REGEX = /@(example\.(com|org|net)|test\.com|mailinator\.com|invalid\.com)$/i;
const CLEAR_TEST_NAME_REGEX = /\b(test|mock|dummy|probe|cypress|playwright|qa[_\s-]?test|sample lead|final crm safety)\b/i;
const CLEAR_TEST_PHONE_REGEX = /^(9999999999|1234567890|0000000000|1111111111|9876543210|5555555555)$/;
const CLEAR_TEST_REF_REGEX = /^(TEST|MOCK|DEMO|PROBE|DUMMY|SAMPLE)-/i;

const SYSTEM_PROTECTED_EMAILS = [
    'ceo@banarasyatra.com',
    'manager@banarasyatra.com',
    'info.varanasi.yatra@gmail.com'
];

function classifyRecord(record, type) {
    const customerDetails = record.customerDetails || {};
    const name = String(record.name || record.customerName || record.vendorName || record.businessName || customerDetails.name || record.title || '').trim();
    const email = String(record.email || record.customerEmail || customerDetails.email || '').trim().toLowerCase();
    const phone = String(record.phone || record.mobile || record.customerPhone || customerDetails.phone || '').replace(/[\s\-\+]/g, '');
    const notes = String(record.adminNotes || record.specialRequirements || record.notes || record.remarks || record.termsNotes || record.description || '');
    const ref = String(record.bookingId || record.bookingNumber || record.leadId || record.quoteId || record.quoteNumber || record.paymentId || record.referenceNumber || record.qrCode || record.code || record.vendorCode || '');

    // 1. Protected System Accounts
    if (SYSTEM_PROTECTED_EMAILS.includes(email)) {
        return { classification: 'REAL_DATA', reason: 'System protected production account' };
    }

    // 2. CLEAR_TEST Signals
    const clearReasons = [];
    if (email && CLEAR_TEST_EMAIL_REGEX.test(email)) {
        clearReasons.push(`Test domain/email (${email})`);
    }
    if (name && CLEAR_TEST_NAME_REGEX.test(name)) {
        clearReasons.push(`Test naming pattern ("${name}")`);
    }
    if (phone && (CLEAR_TEST_PHONE_REGEX.test(phone) || phone.includes('9999999999'))) {
        clearReasons.push(`Test phone number (${phone})`);
    }
    if (ref && (CLEAR_TEST_REF_REGEX.test(ref) || /\b(test|mock|probe|dummy)\b/i.test(ref))) {
        clearReasons.push(`Test reference ID ("${ref}")`);
    }
    if (record.createdBy && /\b(test|dummy|probe)\b/i.test(record.createdBy)) {
        clearReasons.push(`Test creator ("${record.createdBy}")`);
    }

    if (clearReasons.length > 0) {
        return { classification: 'CLEAR_TEST', reason: clearReasons.join('; ') };
    }

    // 3. LIKELY_TEST Signals
    const likelyReasons = [];
    if (notes && /\b(test|dummy|probe|mock)\b/i.test(notes)) {
        likelyReasons.push('Test keyword present in notes/remarks');
    }
    if (email && (email.startsWith('test') || email.startsWith('probe') || email.startsWith('dummy'))) {
        likelyReasons.push(`Suspicious email prefix (${email})`);
    }
    if (name && /\b(demo|sample)\b/i.test(name)) {
        likelyReasons.push(`Demo or sample indicator in name ("${name}")`);
    }

    if (likelyReasons.length > 0) {
        return { classification: 'LIKELY_TEST', reason: likelyReasons.join('; ') };
    }

    // 4. UNKNOWN Signals (Incomplete or ambiguous contact details)
    if (!name && !email && !phone && !ref) {
        return { classification: 'UNKNOWN', reason: 'Missing identifying customer/user contact data' };
    }
    if (phone && phone.length < 8 && !email && !name) {
        return { classification: 'UNKNOWN', reason: 'Truncated or unverified phone number without name or email' };
    }

    // 5. REAL_DATA
    return { classification: 'REAL_DATA', reason: 'Valid business data or operational payload' };
}

async function runInventory() {
    console.log('=======================================================');
    console.log('📊 MONGODB PRODUCTION DATA HYGIENE INVENTORY');
    console.log(`Connected to: ${sanitizeUri(MONGO_URI)}`);
    console.log('Mode: READ-ONLY INVENTORY (NO MODIFICATIONS)');
    console.log('=======================================================\n');

    await mongoose.connect(MONGO_URI);
    const db = mongoose.connection.db;

    const collectionsToScan = [
        'enquiries',
        'inprogress_bookings',
        'confirmed_bookings',
        'tripstarted_bookings',
        'completed_bookings',
        'cancelled_bookings',
        'users',
        'vendors',
        'quotes',
        'bookings',
        'hotel_partners',
        'qr_records',
        'customer_payments',
        'vendor_payments',
        'business_expenses'
    ];

    const inventoryReport = {
        timestamp: new Date().toISOString(),
        database: db.databaseName,
        collections: {},
        totals: {
            totalScanned: 0,
            CLEAR_TEST: 0,
            LIKELY_TEST: 0,
            UNKNOWN: 0,
            REAL_DATA: 0
        },
        sampleTestRecords: []
    };

    const existingCollections = (await db.listCollections().toArray()).map(c => c.name);

    for (const collName of collectionsToScan) {
        if (!existingCollections.includes(collName)) {
            continue;
        }

        const coll = db.collection(collName);
        const records = await coll.find({}).toArray();

        const stats = {
            total: records.length,
            CLEAR_TEST: 0,
            LIKELY_TEST: 0,
            UNKNOWN: 0,
            REAL_DATA: 0,
            records: []
        };

        for (const doc of records) {
            const { classification, reason } = classifyRecord(doc, collName);
            stats[classification]++;
            inventoryReport.totals[classification]++;
            inventoryReport.totals.totalScanned++;

            const summaryDoc = {
                id: doc._id.toString(),
                collection: collName,
                name: doc.name || doc.customerName || doc.vendorName || doc.title || 'N/A',
                email: doc.email || doc.customerEmail || 'N/A',
                phone: doc.phone || doc.mobile || doc.customerPhone || 'N/A',
                classification,
                reason
            };

            if (classification === 'CLEAR_TEST' && inventoryReport.sampleTestRecords.length < 20) {
                inventoryReport.sampleTestRecords.push(summaryDoc);
            }

            stats.records.push(summaryDoc);
        }

        inventoryReport.collections[collName] = {
            total: stats.total,
            CLEAR_TEST: stats.CLEAR_TEST,
            LIKELY_TEST: stats.LIKELY_TEST,
            UNKNOWN: stats.UNKNOWN,
            REAL_DATA: stats.REAL_DATA
        };

        console.log(`📁 Collection [${collName.padEnd(20)}]: Total = ${String(stats.total).padStart(3)} | CLEAR_TEST = ${String(stats.CLEAR_TEST).padStart(3)} | LIKELY_TEST = ${String(stats.LIKELY_TEST).padStart(2)} | UNKNOWN = ${String(stats.UNKNOWN).padStart(2)} | REAL_DATA = ${String(stats.REAL_DATA).padStart(3)}`);
    }

    console.log('\n=======================================================');
    console.log('SUMMARY TOTALS:');
    console.log(`Total Records Scanned: ${inventoryReport.totals.totalScanned}`);
    console.log(`CLEAR_TEST:            ${inventoryReport.totals.CLEAR_TEST}`);
    console.log(`LIKELY_TEST:           ${inventoryReport.totals.LIKELY_TEST}`);
    console.log(`UNKNOWN:               ${inventoryReport.totals.UNKNOWN}`);
    console.log(`REAL_DATA:             ${inventoryReport.totals.REAL_DATA}`);
    console.log('=======================================================');

    console.log('\nSample CLEAR_TEST Records (up to 10):');
    inventoryReport.sampleTestRecords.slice(0, 10).forEach((rec, idx) => {
        console.log(`  ${idx + 1}. [${rec.collection}] ID: ${rec.id} | Name: ${rec.name} | Email: ${rec.email} | Reason: ${rec.reason}`);
    });

    await mongoose.disconnect();
    return inventoryReport;
}

if (require.main === module) {
    runInventory()
        .then(() => process.exit(0))
        .catch(err => {
            console.error('Inventory failed:', err);
            process.exit(1);
        });
}

module.exports = {
    runInventory,
    classifyRecord
};
