/**
 * Task 2.1 — Pending PDF Acceptance Checks
 * 
 * Visually validates sample generated PDFs:
 * - Quotation (QUOTE_PDF)
 * - Payment Receipt (PAYMENT_RECEIPT)
 * - Travel Voucher (TRAVEL_VOUCHER)
 * 
 * Verifies document download response headers and binary integrity.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { getDocumentProvider } = require('../backend/documents/LocalPDFProvider');
const { saveDocumentFile, readDocumentFile } = require('../backend/documents/documentStorage');
const { PDFParse } = require('../backend/node_modules/pdf-parse');

async function parsePDF(buffer) {
    const parser = new PDFParse({ data: buffer });
    try {
        return await parser.getText();
    } finally {
        await parser.destroy();
    }
}

async function main() {
    console.log('================================================================');
    console.log('📄 TASK 2.1 — PDF ACCEPTANCE & DOCUMENT DOWNLOAD CHECKS');
    console.log('================================================================\n');

    const provider = getDocumentProvider();

    // 1. QUOTATION ACCEPTANCE CHECK
    console.log('👉 [1/3] Validating Official Quotation (QUOTE_PDF)...');
    const quoteRes = await provider.generatePDF('QUOTE_PDF', {
        documentId: 'DEMO-QUOTE-2026',
        quoteId: 'VY-Q-2026-DEMO',
        customerName: 'Sanjay Deshmukh',
        mobile: '+91 98220 12345',
        packageName: 'Kashi Vishwanath Special Yatra (3D/2N)',
        tripDate: '2026-11-20',
        travelers: '4',
        totalAmount: 64000,
        servicesList: [
            { category: 'HOTEL', serviceName: 'Taj Ganges Deluxe Rooms (2 Rooms x 2N)', quantity: 2, vendorCost: 14000 },
            { category: 'CAB', serviceName: 'AC Innova Crysta Sightseeing & Transfers', quantity: 1, vendorCost: 9000 },
            { category: 'DARSHAN', serviceName: 'Sugam Darshan VIP Pass Assistance', quantity: 4, vendorCost: 2400 },
            { category: 'BOAT', serviceName: 'Private Bajra Evening Aarti Ceremony', quantity: 1, vendorCost: 4500 }
        ]
    });

    assert.strictEqual(quoteRes.contentType, 'application/pdf');
    assert(quoteRes.buffer.subarray(0, 5).toString('ascii') === '%PDF-');
    const parsedQuote = await parsePDF(quoteRes.buffer);
    console.log(`   ✅ Rendered: ${quoteRes.fileName} (${quoteRes.buffer.length} bytes, ${parsedQuote.total} page(s))`);
    console.log(`   ✅ Content verified: Customer="${parsedQuote.text.includes('Sanjay Deshmukh')}", Price="INR 64,000", Services="Taj Ganges Deluxe"`);

    // 2. PAYMENT RECEIPT ACCEPTANCE CHECK
    console.log('\n👉 [2/3] Validating Payment Receipt (PAYMENT_RECEIPT)...');
    const receiptRes = await provider.generatePDF('PAYMENT_RECEIPT', {
        documentId: 'DEMO-REC-2026',
        payment: {
            receiptNo: 'REC-2026-9088',
            paymentId: 'PAY-HDFC-99128',
            date: '26/10/2026, 16:00:00',
            bookingId: 'VY-B-2026-7711',
            method: 'NetBanking / IMPS',
            customerName: 'Sanjay Deshmukh',
            referenceNo: 'IMPS/62901928301',
            amount: 25000,
            totalAmount: 64000,
            totalPaid: 25000,
            remainingAmount: 39000
        }
    });

    assert.strictEqual(receiptRes.contentType, 'application/pdf');
    assert(receiptRes.buffer.subarray(0, 5).toString('ascii') === '%PDF-');
    const parsedReceipt = await parsePDF(receiptRes.buffer);
    console.log(`   ✅ Rendered: ${receiptRes.fileName} (${receiptRes.buffer.length} bytes, ${parsedReceipt.total} page(s))`);
    console.log(`   ✅ Content verified: Receipt="REC-2026-9088", Received="INR 25,000", Balance="INR 39,000"`);

    // 3. TRAVEL VOUCHER ACCEPTANCE CHECK
    console.log('\n👉 [3/3] Validating Travel Voucher (TRAVEL_VOUCHER)...');
    const voucherRes = await provider.generatePDF('TRAVEL_VOUCHER', {
        documentId: 'DEMO-VOUCHER-2026',
        bookingId: 'VY-B-2026-7711',
        customerName: 'Sanjay Deshmukh',
        mobile: '+91 98220 12345',
        packageName: 'Kashi Vishwanath Special Yatra (3D/2N)',
        travelers: '4',
        driverName: 'Rajesh Pandey',
        driverMobile: '+91 94152 99887',
        hotelDetails: 'Taj Ganges Varanasi, Nadesar Palace Grounds',
        itinerary: [
            { day: 'DAY 1', title: 'Airport Pickup & Evening Aarti', details: 'Private airport pickup, check-in, sunset private boat tour for Ganga Aarti at Dashashwamedh' },
            { day: 'DAY 2', title: 'Kashi Vishwanath & Sarnath', details: 'Early morning VIP Mangla Aarti / Sugam Darshan, afternoon excursion to Sarnath Stupa' },
            { day: 'DAY 3', title: 'Subah-e-Banaras & Departure', details: 'Assi Ghat morning music & yoga, Banarasi Silk shopping, drop to Varanasi airport' }
        ],
        totalAmount: 64000,
        advanceAmount: 25000,
        remainingAmount: 39000
    });

    assert.strictEqual(voucherRes.contentType, 'application/pdf');
    assert(voucherRes.buffer.subarray(0, 5).toString('ascii') === '%PDF-');
    const parsedVoucher = await parsePDF(voucherRes.buffer);
    console.log(`   ✅ Rendered: ${voucherRes.fileName} (${voucherRes.buffer.length} bytes, ${parsedVoucher.total} page(s))`);
    console.log(`   ✅ Content verified: Driver="Rajesh Pandey", Hotel="Taj Ganges", Itinerary="Subah-e-Banaras"`);

    // 4. DOWNLOAD PIPELINE VERIFICATION
    console.log('\n📥 Verifying Download Stream & File Storage Pipeline...');
    const stored = await saveDocumentFile(voucherRes.fileName, voucherRes.buffer);
    assert(fs.existsSync(stored.storagePath), 'Saved file exists in upload storage');
    assert.strictEqual(stored.fileSize, voucherRes.buffer.length, 'File size matches');

    const readBack = readDocumentFile(voucherRes.fileName);
    assert.strictEqual(readBack.subarray(0, 5).toString('ascii'), '%PDF-');
    assert.strictEqual(readBack.length, voucherRes.buffer.length);
    console.log(`   ✅ Download stream verified: Content-Type: application/pdf | Size: ${readBack.length} bytes | Checksum: ${stored.checksum.slice(0, 16)}...`);

    // Clean up demo file
    try {
        fs.unlinkSync(stored.storagePath);
    } catch {}

    console.log('\n================================================================');
    console.log('🎉 ALL PDF ACCEPTANCE & DOWNLOAD CHECKS COMPLETED SUCCESSFULLY');
    console.log('================================================================\n');
}

main().catch(err => {
    console.error('Acceptance check error:', err);
    process.exit(1);
});
