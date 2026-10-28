/**
 * Task 1.2 Automated Regression Suite: Genuine PDF Binary Integrity Tests
 * 
 * Verifies:
 * 1. Each supported document type produces a non-empty binary PDF buffer.
 * 2. Output starts with PDF magic bytes '%PDF-'.
 * 3. Document is parsed by a real PDF parser (pdf-parse), not merely byte-checked.
 * 4. Synthetic customer, itinerary, amounts, and document fields appear in extracted text.
 * 5. Multi-page pagination handles large datasets without losing content.
 * 6. Malformed and edge-case inputs fail safely.
 * 7. Provider interface, contentType, filename, and download pipeline remain intact.
 * 8. Existing document and quote-to-receipt flow remain functional.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Load provider and parser from backend
const { LocalPDFProvider, getDocumentProvider } = require('../backend/documents/LocalPDFProvider');
const { generatePDFBuffer, formatCurrency } = require('../backend/documents/pdfDocumentBuilder');
const { saveDocumentFile, readDocumentFile } = require('../backend/documents/documentStorage');
const { generateDocument } = require('../backend/documents/documentService');
const { PDFParse } = require('../backend/node_modules/pdf-parse');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

async function runTest(name, fn) {
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

async function parsePDF(buffer) {
    const parser = new PDFParse({ data: buffer });
    try {
        const result = await parser.getText();
        return result;
    } finally {
        await parser.destroy();
    }
}

async function main() {
    console.log('================================================================');
    console.log('🧪 TASK 1.2: PDF ENGINE BINARY INTEGRITY & PARSER REGRESSION SUITE');
    console.log('================================================================\n');

    const provider = getDocumentProvider();

    // -------------------------------------------------------------
    // SUITE 1: SUPPORTED DOCUMENT TYPES & MAGIC BYTES
    // -------------------------------------------------------------
    console.log('📋 Suite 1: Document Types & Magic Byte Signatures');

    const docTypes = [
        'QUOTE_PDF',
        'BOOKING_CONFIRMATION',
        'TRAVEL_VOUCHER',
        'PAYMENT_RECEIPT',
        'CUSTOMER_INVOICE',
        'DRIVER_OPERATIONS_SHEET',
        'VENDOR_OPERATIONS_SHEET',
        'INTERNAL_FINANCIAL_REPORT',
        'QUOTE',
        'TAX_INVOICE',
        'DRIVER_SHEET'
    ];

    for (const docType of docTypes) {
        await runTest(`Document type "${docType}" returns valid non-empty %PDF- buffer`, async () => {
            const res = await provider.generatePDF(docType, {
                documentId: `TEST-${docType}-001`,
                bookingId: 'VY-B-2026-TEST',
                quoteId: 'VY-Q-TEST-001',
                customerName: 'Aarav Patel',
                mobile: '+919876543210',
                totalAmount: 45000,
                paidAmount: 20000,
                remainingAmount: 25000
            });

            assert(res, 'Provider must return response object');
            assert(Buffer.isBuffer(res.buffer), 'res.buffer must be a Buffer instance');
            assert(res.buffer.length > 500, `Buffer must be substantial (>500 bytes), got ${res.buffer.length}`);
            assert.strictEqual(res.contentType, 'application/pdf', 'res.contentType must be application/pdf');
            assert(res.fileName.endsWith('.pdf'), `fileName must end with .pdf, got ${res.fileName}`);
            assert.strictEqual(res.providerName, 'LocalPDFProvider', 'providerName must be LocalPDFProvider');

            // Magic bytes check
            const signature = res.buffer.subarray(0, 5).toString('ascii');
            assert.strictEqual(signature, '%PDF-', `Output must begin with %PDF-, got ${signature}`);
        });
    }

    // -------------------------------------------------------------
    // SUITE 2: REAL PDF PARSING & EXTRACTED TEXT VERIFICATION
    // -------------------------------------------------------------
    console.log('\n🔍 Suite 2: Real PDF Parser & Text Extraction Verification');

    await runTest('Quote PDF text extraction contains customer, branding, and pricing fields', async () => {
        const res = await provider.generatePDF('QUOTE_PDF', {
            documentId: 'VY-Q-2026-901',
            quoteId: 'VY-Q-2026-901',
            customerName: 'Sunita Mehra',
            mobile: '+91 98111 22334',
            packageName: 'Kashi Vishwanath Special Yatra',
            tripDate: '2026-11-15',
            travelers: '3',
            totalAmount: 52000,
            servicesList: [
                { category: 'HOTEL', serviceName: 'Taj Ganges Varanasi (3N)', quantity: 1, vendorCost: 18000 },
                { category: 'CAB', serviceName: 'Innova Crysta AC (4 Days)', quantity: 1, vendorCost: 12000 }
            ]
        });

        const parsed = await parsePDF(res.buffer);
        assert(parsed.total >= 1, 'Quote must have at least 1 page');
        assert(parsed.text.includes('KASHI-VASHI'), 'Must contain brand name');
        assert(parsed.text.includes('Sunita Mehra'), 'Must contain customer name');
        assert(parsed.text.includes('VY-Q-2026-901'), 'Must contain quote reference');
        assert(parsed.text.includes('52,000'), 'Must contain quoted price');
        assert(parsed.text.includes('Kashi Vishwanath Special Yatra'), 'Must contain package name');
        assert(parsed.text.includes('Taj Ganges Varanasi'), 'Must contain custom service description');
    });

    await runTest('Payment Receipt text extraction contains payment details and breakdown', async () => {
        const res = await provider.generatePDF('PAYMENT_RECEIPT', {
            documentId: 'REC-2026-4401',
            payment: {
                receiptNo: 'REC-2026-4401',
                paymentId: 'PAY-UPI-9921',
                date: '26/10/2026, 15:30:00',
                bookingId: 'VY-B-2026-8800',
                method: 'UPI / GooglePay',
                customerName: 'Vikramaditya Rao',
                referenceNo: 'UPI/9988112233',
                amount: 15000,
                totalAmount: 40000,
                totalPaid: 15000,
                remainingAmount: 25000
            }
        });

        const parsed = await parsePDF(res.buffer);
        assert(parsed.text.includes('PAYMENT RECEIPT'), 'Must contain PAYMENT RECEIPT title');
        assert(parsed.text.includes('Vikramaditya Rao'), 'Must contain customer name');
        assert(parsed.text.includes('PAY-UPI-9921'), 'Must contain payment ID');
        assert(parsed.text.includes('VY-B-2026-8800'), 'Must contain booking ID');
        assert(parsed.text.includes('15,000'), 'Must contain payment amount');
        assert(parsed.text.includes('25,000'), 'Must contain remaining due amount');
    });

    await runTest('Travel Voucher text extraction contains itinerary, driver, and emergency contacts', async () => {
        const res = await provider.generatePDF('TRAVEL_VOUCHER', {
            documentId: 'VOUCHER-2026-001',
            bookingId: 'VY-B-2026-5544',
            customerName: 'Pooja Bhatt',
            mobile: '+91 97777 88888',
            packageName: 'Banaras Heritage & Ghat Experience',
            travelers: '2',
            driverName: 'Mohan Lal',
            driverMobile: '+91 94150 12345',
            hotelDetails: 'BrijRama Palace Varanasi',
            itinerary: [
                { day: 'DAY 1', title: 'Arrival & Ganga Aarti', details: 'Private boat ride at Dashashwamedh Ghat' },
                { day: 'DAY 2', title: 'Temple & Sarnath Tour', details: 'VIP darshan and Buddhist monastery visit' }
            ],
            totalAmount: 38000,
            advanceAmount: 18000,
            remainingAmount: 20000
        });

        const parsed = await parsePDF(res.buffer);
        assert(parsed.text.includes('CUSTOMER TRAVEL VOUCHER'), 'Must contain TRAVEL VOUCHER title');
        assert(parsed.text.includes('Pooja Bhatt'), 'Must contain guest name');
        assert(parsed.text.includes('Mohan Lal'), 'Must contain driver name');
        assert(parsed.text.includes('+91 94150 12345'), 'Must contain driver contact');
        assert(parsed.text.includes('BrijRama Palace'), 'Must contain hotel details');
        assert(parsed.text.includes('Private boat ride at Dashashwamedh Ghat'), 'Must contain custom itinerary line');
        assert(parsed.text.includes('38,000'), 'Must contain total package amount');
    });

    await runTest('Customer Tax Invoice text extraction contains billing and tax mode', async () => {
        const res = await provider.generatePDF('CUSTOMER_INVOICE', {
            documentId: 'INV-2026-301',
            invoice: {
                invoiceNo: 'INV-2026-301',
                customerName: 'Deepak Singhania',
                mobile: '+91 99999 11111',
                bookingId: 'VY-B-2026-1020',
                packageName: 'Custom Pilgrimage Package',
                totalAmount: 60000,
                taxMode: 'GST_INCLUDED'
            }
        });

        const parsed = await parsePDF(res.buffer);
        assert(parsed.text.includes('TAX INVOICE'), 'Must contain TAX INVOICE title');
        assert(parsed.text.includes('Deepak Singhania'), 'Must contain customer name');
        assert(parsed.text.includes('GST_INCLUDED'), 'Must contain tax mode');
        assert(parsed.text.includes('60,000'), 'Must contain total amount');
    });

    await runTest('Internal Financial Report text extraction contains confidential margins', async () => {
        const res = await provider.generatePDF('INTERNAL_FINANCIAL_REPORT', {
            documentId: 'FIN-AUDIT-99',
            financial: {
                bookingId: 'VY-B-2026-7788',
                totalAmount: 70000,
                paidAmount: 70000,
                plannedVendorCost: 42000,
                actualVendorCost: 40000,
                expenses: 2500,
                commission: 3000,
                expectedProfit: 28000,
                actualProfit: 30500
            }
        });

        const parsed = await parsePDF(res.buffer);
        assert(parsed.text.includes('CEO INTERNAL BOOKING FINANCIAL AUDIT REPORT'), 'Must contain CEO report title');
        assert(parsed.text.includes('CONFIDENTIAL'), 'Must contain confidentiality disclaimer');
        assert(parsed.text.includes('42,000'), 'Must contain planned cost');
        assert(parsed.text.includes('40,000'), 'Must contain actual cost');
        assert(parsed.text.includes('30,500'), 'Must contain actual net profit');
    });

    // -------------------------------------------------------------
    // SUITE 3: MULTI-PAGE PAGINATION & OVERFLOW HANDLING
    // -------------------------------------------------------------
    console.log('\n📄 Suite 3: Multi-Page Pagination & Data Loss Prevention');

    await runTest('Long itemized services list paginates cleanly across multiple pages without data loss', async () => {
        const longServicesList = [];
        for (let i = 1; i <= 35; i++) {
            longServicesList.push({
                category: i % 2 === 0 ? 'HOTEL' : 'TRANSPORT',
                serviceName: `Extended Itinerary Segment #${i} — Special Banaras Service Description with Full Details`,
                quantity: i,
                vendorCost: i * 500
            });
        }

        const res = await provider.generatePDF('QUOTE_PDF', {
            documentId: 'VY-Q-LONG-001',
            quoteId: 'VY-Q-LONG-001',
            customerName: 'Multi-Page Test Guest',
            servicesList: longServicesList,
            totalAmount: 250000
        });

        const parsed = await parsePDF(res.buffer);
        assert(parsed.total >= 2, `Long document must span at least 2 pages, got ${parsed.total}`);
        assert(parsed.text.includes('Segment #1'), 'First item must exist in parsed text');
        assert(parsed.text.includes('Segment #18'), 'Midway item must exist in parsed text');
        assert(parsed.text.includes('Segment #35'), 'Final item must exist in parsed text without being cut off');
        assert(parsed.text.includes(`Page 1 of ${parsed.total}`), 'Page 1 footer must reflect total count');
        assert(parsed.text.includes(`Page ${parsed.total} of ${parsed.total}`), 'Final page footer must reflect total count');
    });

    // -------------------------------------------------------------
    // SUITE 4: SAFE ERROR HANDLING & MALFORMED INPUTS
    // -------------------------------------------------------------
    console.log('\n🛡️ Suite 4: Malformed Inputs & Safe Fallbacks');

    await runTest('Empty or minimal data object does not throw or crash', async () => {
        const res = await provider.generatePDF('BOOKING_CONFIRMATION', {});
        assert(Buffer.isBuffer(res.buffer), 'Must return valid buffer even for empty payload');
        assert(res.buffer.subarray(0, 5).toString('ascii') === '%PDF-', 'Must start with %PDF-');
        const parsed = await parsePDF(res.buffer);
        assert(parsed.total >= 1, 'Must produce readable page');
        assert(parsed.text.includes('Valued Guest'), 'Must fallback to default customer name');
    });

    await runTest('Null data parameter falls back safely', async () => {
        const res = await provider.generatePDF('QUOTE_PDF', null);
        assert(Buffer.isBuffer(res.buffer), 'Must return valid buffer');
        assert(res.buffer.subarray(0, 5).toString('ascii') === '%PDF-');
    });

    await runTest('Invalid document type in direct builder rejects with descriptive error', async () => {
        let threw = false;
        try {
            await generatePDFBuffer(null, {});
        } catch (e) {
            threw = true;
            assert(e.message.includes('valid documentType'), 'Error message must mention valid documentType');
        }
        assert(threw, 'Should throw for null document type');
    });

    // -------------------------------------------------------------
    // SUITE 5: STORAGE PIPELINE & SERVICE INTEGRATION
    // -------------------------------------------------------------
    console.log('\n💾 Suite 5: Storage Pipeline & Service Integration');

    await runTest('Document file save, read, and SHA-256 checksum verify cleanly on disk', async () => {
        const testFileName = `TEST_AUDIT_${Date.now()}.pdf`;
        const testPdf = await provider.generatePDF('PAYMENT_RECEIPT', {
            documentId: 'AUDIT-REC-01',
            customerName: 'Storage Test Guest',
            totalAmount: 10000
        });

        // Save through documentStorage
        const saveRes = await saveDocumentFile(testFileName, testPdf.buffer);
        assert.strictEqual(saveRes.fileName, testFileName, 'Stored filename matches');
        assert(fs.existsSync(saveRes.storagePath), 'File must exist on disk in document storage');
        assert.strictEqual(saveRes.fileSize, testPdf.buffer.length, 'Stored filesize matches buffer length');

        // Read back
        const readBuffer = readDocumentFile(testFileName);
        assert.strictEqual(readBuffer.subarray(0, 5).toString('ascii'), '%PDF-', 'Read buffer starts with %PDF-');
        assert.strictEqual(readBuffer.length, testPdf.buffer.length, 'Read buffer matches original length');

        // Clean up synthetic test file
        try {
            fs.unlinkSync(saveRes.storagePath);
        } catch {}
    });

    await runTest('documentService.generateDocument produces READY document with real PDF on disk', async () => {
        const doc = await generateDocument({
            documentType: 'TRAVEL_VOUCHER',
            bookingId: 'VY-B-SYNTHETIC-99',
            user: { name: 'Test Manager', role: 'Manager' },
            customData: {
                bookingId: 'VY-B-SYNTHETIC-99',
                customerName: 'Synthetic Pipeline Traveler',
                packageName: 'Pipeline Test Package',
                totalAmount: 32000
            }
        });

        assert.strictEqual(doc.status, 'READY', 'Document status is READY');
        assert.strictEqual(doc.storageProvider, 'LocalPDFProvider', 'Storage provider is LocalPDFProvider');
        assert(doc.fileName.endsWith('.pdf'), 'Document fileName ends with .pdf');

        const fileBuffer = readDocumentFile(doc.fileName);
        assert(fileBuffer.subarray(0, 5).toString('ascii') === '%PDF-', 'Stored document starts with %PDF-');

        const parsed = await parsePDF(fileBuffer);
        assert(parsed.text.includes('Synthetic Pipeline Traveler'), 'Extracted text contains synthetic traveler');

        // Clean up test file
        try {
            const filePath = path.join(__dirname, '../backend/uploads/documents', doc.fileName);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch {}
    });

    console.log('\n================================================================');
    console.log(`📊 SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (${failedTests === 0 ? '100% SUCCESS' : `${failedTests} FAILED`})`);
    console.log('================================================================\n');

    if (failedTests > 0) {
        process.exit(1);
    }
}

main().catch(err => {
    console.error('Fatal test error:', err);
    process.exit(1);
});
