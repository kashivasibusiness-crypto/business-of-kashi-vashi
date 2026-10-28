const PDFDocument = require('pdfkit');

/**
 * Standard colors and branding tokens for Kashi-Vashi Travel OS
 */
const BRAND = {
    navy: '#0F172A',
    slate: '#1E293B',
    orange: '#EA580C',
    lightOrange: '#FFF7ED',
    borderOrange: '#FED7AA',
    darkOrange: '#9A3412',
    green: '#16A34A',
    lightGreen: '#F0FDF4',
    borderGreen: '#BBF7D0',
    red: '#DC2626',
    lightRed: '#FEF2F2',
    borderRed: '#FECACA',
    grayText: '#475569',
    lightGrayText: '#94A3B8',
    darkText: '#0F172A',
    tableBorder: '#E2E8F0',
    tableBg: '#F8FAFC'
};

function formatCurrency(amount) {
    const num = Number(amount) || 0;
    return `INR ${num.toLocaleString('en-IN')}`;
}

/**
 * Draws the branded top header box
 */
function drawBrandHeader(doc) {
    const startX = 40;
    const startY = 40;
    const width = doc.page.width - 80;
    const height = 65;

    // Background banner
    doc.save();
    doc.roundedRect(startX, startY, width, height, 6).fill(BRAND.navy);

    // Left side: Brand Title & Tagline
    doc.fillColor(BRAND.orange)
       .font('Helvetica-Bold')
       .fontSize(18)
       .text('KASHI-VASHI', startX + 16, startY + 14, { lineBreak: false });

    doc.fillColor(BRAND.lightGrayText)
       .font('Helvetica-Oblique')
       .fontSize(9)
       .text('Your Journey Begins with Trust', startX + 16, startY + 38, { lineBreak: false });

    // Right side: Contact Details
    doc.fillColor('#CBD5E1')
       .font('Helvetica')
       .fontSize(8)
       .text('Dashashwamedh Ghat Road, Varanasi, UP 221001', startX, startY + 12, {
           width: width - 16,
           align: 'right'
       })
       .text('Phone: +91 84005 54029 | WhatsApp: +91 81497 83494', startX, startY + 26, {
           width: width - 16,
           align: 'right'
       })
       .text('kashivasi.business@gmail.com | https://varanasiyatra.com', startX, startY + 40, {
           width: width - 16,
           align: 'right'
       });

    doc.restore();
    doc.y = startY + height + 15;
}

/**
 * Draws document title ribbon with reference number
 */
function drawTitleBanner(doc, title, refText, bgColor = BRAND.lightOrange, textColor = BRAND.darkOrange, borderColor = BRAND.borderOrange) {
    const startX = 40;
    const startY = doc.y;
    const width = doc.page.width - 80;
    const height = 34;

    doc.save();
    doc.roundedRect(startX, startY, width, height, 4)
       .fillAndStroke(bgColor, borderColor);

    doc.fillColor(textColor)
       .font('Helvetica-Bold')
       .fontSize(12)
       .text(title, startX + 12, startY + 11, { lineBreak: false });

    if (refText) {
        doc.fillColor(BRAND.darkText)
           .font('Helvetica-Bold')
           .fontSize(10)
           .text(refText, startX, startY + 12, {
               width: width - 12,
               align: 'right'
           });
    }

    doc.restore();
    doc.y = startY + height + 15;
}

/**
 * Check if space is remaining on current page; if not, add a page
 */
function checkPageSpace(doc, requiredHeight = 40) {
    if (doc.y + requiredHeight > doc.page.height - 60) {
        doc.addPage();
        doc.y = 40;
        return true;
    }
    return false;
}

/**
 * Draws a 2x2 or 2x3 key-value grid for metadata
 */
function drawMetaGrid(doc, rows) {
    const startX = 40;
    const width = doc.page.width - 80;
    const colWidth = width / 2;
    const rowHeight = 22;

    for (const row of rows) {
        checkPageSpace(doc, rowHeight);
        const y = doc.y;

        doc.save();
        doc.rect(startX, y, width, rowHeight).fillAndStroke(BRAND.tableBg, BRAND.tableBorder);

        // Col 1: Label + Value
        doc.fillColor(BRAND.grayText).font('Helvetica-Bold').fontSize(9)
           .text(row[0].label + ':', startX + 8, y + 6, { width: 95, lineBreak: false });
        doc.fillColor(BRAND.darkText).font('Helvetica').fontSize(9)
           .text(String(row[0].value || 'N/A'), startX + 105, y + 6, { width: colWidth - 115, ellipsis: true });

        // Col 2: Label + Value (if present)
        if (row[1]) {
            doc.fillColor(BRAND.grayText).font('Helvetica-Bold').fontSize(9)
               .text(row[1].label + ':', startX + colWidth + 8, y + 6, { width: 95, lineBreak: false });
            doc.fillColor(BRAND.darkText).font('Helvetica').fontSize(9)
               .text(String(row[1].value || 'N/A'), startX + colWidth + 105, y + 6, { width: colWidth - 115, ellipsis: true });
        }

        doc.restore();
        doc.y = y + rowHeight;
    }
    doc.y += 12;
}

/**
 * Draws a section header bar
 */
function drawSectionHeader(doc, text) {
    checkPageSpace(doc, 25);
    const startX = 40;
    const width = doc.page.width - 80;

    doc.fillColor(BRAND.navy)
       .font('Helvetica-Bold')
       .fontSize(11)
       .text(text, startX, doc.y);

    doc.save();
    doc.strokeColor(BRAND.orange).lineWidth(1.5)
       .moveTo(startX, doc.y + 2)
       .lineTo(startX + width, doc.y + 2)
       .stroke();
    doc.restore();

    doc.y += 8;
}

/**
 * Draws a summary callout box (e.g. Total Quoted, Amount Paid, Profit)
 */
function drawCalloutBox(doc, label, amountText, bgColor = BRAND.lightOrange, borderColor = BRAND.borderOrange, textColor = BRAND.orange) {
    checkPageSpace(doc, 45);
    const startX = 40;
    const startY = doc.y;
    const width = doc.page.width - 80;
    const height = 40;

    doc.save();
    doc.roundedRect(startX, startY, width, height, 6).fillAndStroke(bgColor, borderColor);

    doc.fillColor(BRAND.grayText)
       .font('Helvetica-Bold')
       .fontSize(11)
       .text(label, startX + 14, startY + 14, { lineBreak: false });

    doc.fillColor(textColor)
       .font('Helvetica-Bold')
       .fontSize(15)
       .text(amountText, startX, startY + 12, {
           width: width - 16,
           align: 'right'
       });

    doc.restore();
    doc.y = startY + height + 15;
}

/**
 * Draws a multi-row structured table with column widths
 */
function drawTable(doc, headers, rows, colWidths, alignments = []) {
    const startX = 40;
    const width = doc.page.width - 80;
    const headerHeight = 22;
    const rowHeight = 20;

    // Header function
    const renderHeader = () => {
        const y = doc.y;
        doc.save();
        doc.rect(startX, y, width, headerHeight).fill(BRAND.navy);
        let curX = startX;
        headers.forEach((h, idx) => {
            const w = colWidths[idx];
            const align = alignments[idx] || 'left';
            doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(9)
               .text(h, curX + 6, y + 6, { width: w - 12, align });
            curX += w;
        });
        doc.restore();
        doc.y = y + headerHeight;
    };

    renderHeader();

    rows.forEach((row, rowIdx) => {
        if (doc.y + rowHeight > doc.page.height - 60) {
            doc.addPage();
            doc.y = 40;
            renderHeader();
        }

        const y = doc.y;
        doc.save();
        const bg = rowIdx % 2 === 0 ? '#FFFFFF' : BRAND.tableBg;
        doc.rect(startX, y, width, rowHeight).fillAndStroke(bg, BRAND.tableBorder);

        let curX = startX;
        row.forEach((cell, idx) => {
            const w = colWidths[idx];
            const align = alignments[idx] || 'left';
            doc.fillColor(BRAND.darkText).font('Helvetica').fontSize(9)
               .text(String(cell !== undefined && cell !== null ? cell : ''), curX + 6, y + 5, { width: w - 12, align, ellipsis: true });
            curX += w;
        });
        doc.restore();
        doc.y = y + rowHeight;
    });

    doc.y += 12;
}

/**
 * Stamp running footers on all buffered pages
 */
function stampAllFooters(doc) {
    const range = doc.bufferedPageRange();
    const width = doc.page.width - 80;
    const startX = 40;

    for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        const savedBottom = doc.page.margins.bottom;
        doc.page.margins.bottom = 0;

        const footerY = doc.page.height - 40;

        // Thin divider
        doc.save();
        doc.strokeColor(BRAND.tableBorder).lineWidth(0.8)
           .moveTo(startX, footerY - 5)
           .lineTo(startX + width, footerY - 5)
           .stroke();

        doc.fillColor(BRAND.grayText)
           .font('Helvetica')
           .fontSize(7.5)
           .text('Kashi-Vashi · Authentic Pilgrimages & Custom Tours · Dashashwamedh Ghat Road, Varanasi | +91 84005 54029', startX, footerY, {
               width,
               align: 'center'
           })
           .fillColor(BRAND.lightGrayText)
           .fontSize(7)
           .text(`Official Document — Kashi-Vashi Travel OS   |   Page ${i + 1} of ${range.count}`, startX, footerY + 11, {
               width,
               align: 'center'
           });

        doc.restore();
        doc.page.margins.bottom = savedBottom;
    }
}

// -------------------------------------------------------------------------
// DOCUMENT BUILDERS
// -------------------------------------------------------------------------

function buildQuoteDocument(doc, data) {
    const q = data.quote || data;
    const ref = data.documentId || q.quoteId || 'VY-QUOTE';

    drawBrandHeader(doc);
    drawTitleBanner(doc, 'OFFICIAL TRAVEL QUOTATION', `Ref: ${ref}`);

    drawMetaGrid(doc, [
        [
            { label: 'Customer Name', value: q.customerName || data.name || 'Valued Guest' },
            { label: 'Travel Date', value: q.tripDate || q.date || 'To Be Confirmed' }
        ],
        [
            { label: 'Mobile', value: q.mobile || 'N/A' },
            { label: 'Travelers', value: `${q.travelers || '1'} Person(s)` }
        ],
        [
            { label: 'Package Name', value: q.packageName || 'Kashi Special Yatra' },
            { label: 'Valid Until', value: q.validUntil || '7 Days from Issue' }
        ]
    ]);

    drawSectionHeader(doc, 'Included Services');

    const services = Array.isArray(q.servicesList) && q.servicesList.length > 0
        ? q.servicesList
        : [
            { category: 'HOTEL', serviceName: 'Hotel accommodation with breakfast', quantity: 1, vendorCost: 0 },
            { category: 'TRANSPORT', serviceName: 'Private AC Sedan/SUV for transfers & sightseeing', quantity: 1, vendorCost: 0 },
            { category: 'DARSHAN', serviceName: 'VIP Darshan assistance at Kashi Vishwanath Temple', quantity: 1, vendorCost: 0 },
            { category: 'BOAT', serviceName: 'Evening Ganga Aarti boat ride', quantity: 1, vendorCost: 0 }
        ];

    const width = doc.page.width - 80;
    const colWidths = [100, width - 160, 60];
    const headers = ['Category', 'Service Description', 'Qty'];
    const rows = services.map(s => [
        s.category || 'SERVICE',
        s.serviceName || s.name || 'Custom Travel Service',
        s.quantity ? String(s.quantity) : '1'
    ]);

    drawTable(doc, headers, rows, colWidths, ['left', 'left', 'center']);

    const total = q.totalAmount || q.quotedPrice || 0;
    drawCalloutBox(doc, 'Quoted Total Package Price:', formatCurrency(total));
}

function buildBookingConfirmationDocument(doc, data) {
    const b = data.booking || data;
    const ref = b.bookingId || data.documentId || 'VY-B-2026-0001';

    drawBrandHeader(doc);
    drawTitleBanner(doc, 'BOOKING CONFIRMATION', `Booking Ref: ${ref}`, BRAND.lightGreen, BRAND.green, BRAND.borderGreen);

    drawMetaGrid(doc, [
        [
            { label: 'Guest Name', value: b.customerName || 'Valued Guest' },
            { label: 'Mobile', value: b.mobile || 'N/A' }
        ],
        [
            { label: 'Package Name', value: b.packageName || 'Kashi-Vashi' },
            { label: 'Travel Date', value: b.tripDate || 'Confirmed Date' }
        ],
        [
            { label: 'Pickup Location', value: b.pickup || 'Varanasi Airport / Station' },
            { label: 'Travelers', value: `${b.travelers || '1'} Person(s)` }
        ]
    ]);

    drawSectionHeader(doc, 'Confirmed Trip Services');

    const width = doc.page.width - 80;
    const colWidths = [120, width - 120];
    const headers = ['Service Category', 'Arrangement Details'];
    const rows = [
        ['Hotel Accommodation', b.hotelDetails || 'Standard 3-Star Accommodation'],
        ['Cab / Transport', `${b.vehicleModel || 'AC Sedan'} (${b.vehicleNumber || 'Assigned on arrival'})`],
        ['Temple Darshan', 'Kashi Vishwanath Special Entry Included'],
        ['Boat Tour', 'Dashashwamedh Evening Aarti Boat Ride']
    ];

    drawTable(doc, headers, rows, colWidths);

    if (b.totalAmount) {
        drawCalloutBox(doc, 'Total Booking Amount:', formatCurrency(b.totalAmount), BRAND.lightGreen, BRAND.borderGreen, BRAND.green);
    }
}

function buildTravelVoucherDocument(doc, data) {
    const b = data.booking || data;
    const ref = b.bookingId || data.documentId || 'VY-B-2026-0001';

    drawBrandHeader(doc);
    drawTitleBanner(doc, 'CUSTOMER TRAVEL VOUCHER', `Booking Ref: ${ref}`);

    drawSectionHeader(doc, '1. Guest & Trip Overview');
    drawMetaGrid(doc, [
        [
            { label: 'Lead Passenger', value: b.customerName || 'Valued Guest' },
            { label: 'Contact Number', value: b.mobile || 'N/A' }
        ],
        [
            { label: 'Package Selected', value: b.packageName || 'Kashi Special Tour' },
            { label: 'Total Passengers', value: `${b.travelers || '1'} Adult(s)` }
        ]
    ]);

    drawSectionHeader(doc, '2. Day-by-Day Itinerary');

    const itinerary = Array.isArray(b.itinerary) && b.itinerary.length > 0
        ? b.itinerary
        : [
            { day: 'DAY 1', title: 'Arrival & Evening Ganga Aarti', details: 'Pickup from Airport/Station, Hotel Check-in. Evening special boat tour at Dashashwamedh Ghat for Ganga Aarti.' },
            { day: 'DAY 2', title: 'Kashi Vishwanath & Sarnath Tour', details: 'Early morning VIP Darshan at Kashi Vishwanath. Afternoon excursion to Sarnath Stupa & Museum.' },
            { day: 'DAY 3', title: 'Morning Ghat Walk & Departure', details: 'Assi Ghat Subah-e-Banaras experience. Local shopping & departure drop.' }
        ];

    const width = doc.page.width - 80;
    const colWidths = [70, 160, width - 230];
    const headers = ['Day', 'Program', 'Itinerary Description'];
    const rows = itinerary.map(item => [
        item.day || 'Day',
        item.title || 'Tour Program',
        item.details || item.description || ''
    ]);

    drawTable(doc, headers, rows, colWidths);

    drawSectionHeader(doc, '3. Assigned Contacts & Support');
    drawMetaGrid(doc, [
        [
            { label: 'Assigned Driver', value: `${b.driverName || 'Ramesh Kumar'} (${b.driverMobile || '+91 91111 22222'})` },
            { label: 'Hotel Details', value: b.hotelDetails || 'Varanasi Heritage Stay' }
        ],
        [
            { label: '24x7 Helpline', value: '+91 84005 54029' },
            { label: 'WhatsApp Support', value: '+91 81497 83494' }
        ]
    ]);

    drawSectionHeader(doc, '4. Payment Status Summary');

    const total = Number(b.totalAmount || 0);
    const paid = Number(b.advanceAmount || b.paidAmount || 0);
    const due = Number(b.remainingAmount || b.amountDue || (total - paid));

    const payWidths = [width - 150, 150];
    const payHeaders = ['Payment Milestone', 'Amount'];
    const payRows = [
        ['Total Package Amount', formatCurrency(total)],
        ['Amount Paid (Advance)', formatCurrency(paid)],
        ['Balance Due on Arrival', formatCurrency(due)]
    ];

    drawTable(doc, payHeaders, payRows, payWidths, ['left', 'right']);
}

function buildPaymentReceiptDocument(doc, data) {
    const p = data.payment || data;
    const ref = p.receiptNo || data.documentId || 'VY-REC-001';

    drawBrandHeader(doc);
    drawTitleBanner(doc, 'OFFICIAL PAYMENT RECEIPT', `Receipt No: ${ref}`, BRAND.lightGreen, BRAND.green, BRAND.borderGreen);

    drawMetaGrid(doc, [
        [
            { label: 'Payment ID', value: p.paymentId || 'PAY-100' },
            { label: 'Date & Time', value: p.date || p.paymentDate || new Date().toLocaleString('en-IN') }
        ],
        [
            { label: 'Booking Ref', value: p.bookingId || 'VY-B-2026-0001' },
            { label: 'Payment Method', value: p.method || p.paymentMethod || 'UPI / Online' }
        ],
        [
            { label: 'Customer Name', value: p.customerName || 'Valued Guest' },
            { label: 'Reference Number', value: p.referenceNo || p.referenceNumber || 'TXN-998811' }
        ]
    ]);

    const paid = Number(p.amount || p.paidAmount || 0);
    drawCalloutBox(doc, 'Amount Received:', formatCurrency(paid), BRAND.lightGreen, BRAND.borderGreen, BRAND.green);

    drawSectionHeader(doc, 'Booking Balance Summary');

    const total = Number(p.totalAmount || 0);
    const totalPaid = Number(p.totalPaid || p.paidAmount || paid);
    const due = Number(p.remainingAmount || p.amountDue || (total - totalPaid));

    const width = doc.page.width - 80;
    const colWidths = [width - 150, 150];
    const headers = ['Description', 'Amount'];
    const rows = [
        ['Total Package Cost', formatCurrency(total)],
        ['Total Paid Till Date', formatCurrency(totalPaid)],
        ['Remaining Balance Due', formatCurrency(due)]
    ];

    drawTable(doc, headers, rows, colWidths, ['left', 'right']);
}

function buildCustomerInvoiceDocument(doc, data) {
    const inv = data.invoice || data;
    const ref = inv.invoiceNo || data.documentId || 'VY-INV-001';
    const taxMode = inv.taxMode || 'NO_TAX';

    drawBrandHeader(doc);
    drawTitleBanner(doc, 'TAX INVOICE', `Invoice No: ${ref}  |  Tax Mode: ${taxMode}`);

    drawMetaGrid(doc, [
        [
            { label: 'Billed To', value: inv.customerName || 'Valued Guest' },
            { label: 'Invoice Date', value: new Date().toLocaleDateString('en-IN') }
        ],
        [
            { label: 'Mobile', value: inv.mobile || 'N/A' },
            { label: 'Booking Ref', value: inv.bookingId || 'VY-B-2026-0001' }
        ]
    ]);

    drawSectionHeader(doc, 'Service Description & Charges');

    const width = doc.page.width - 80;
    const colWidths = [width - 170, 50, 120];
    const headers = ['Service Description', 'Qty', 'Amount'];
    const total = Number(inv.totalAmount || 0);
    const rows = [
        [inv.packageName || 'Kashi-Vashi Customized Spiritual Tour Package', '1', formatCurrency(total)]
    ];

    drawTable(doc, headers, rows, colWidths, ['left', 'center', 'right']);

    const summaryWidths = [width - 150, 150];
    const summaryRows = [
        ['Subtotal', formatCurrency(total)],
        [`Tax (${taxMode})`, 'INR 0'],
        ['Total Invoice Amount', formatCurrency(total)]
    ];

    drawTable(doc, ['Summary Metric', 'Amount'], summaryRows, summaryWidths, ['left', 'right']);
}

function buildOperationsSheetDocument(doc, data, type) {
    const op = data.operation || data;
    const ref = op.bookingId || data.documentId || 'VY-B-2026-0001';
    const title = type === 'DRIVER' ? 'OPERATIONAL ASSIGNMENT SHEET (DRIVER)' : 'OPERATIONAL ASSIGNMENT SHEET (VENDOR)';

    drawBrandHeader(doc);
    drawTitleBanner(doc, title, `Booking Ref: ${ref}`);

    drawMetaGrid(doc, [
        [
            { label: 'Pickup Date/Time', value: op.pickupDate || op.date || 'Immediate' },
            { label: 'Pickup Location', value: op.pickup || 'Airport / Railway Station' }
        ],
        [
            { label: 'Customer Name', value: op.customerName || 'Guest' },
            { label: 'Travelers Count', value: `${op.travelers || '1'} Person(s)` }
        ],
        [
            { label: type === 'DRIVER' ? 'Assigned Driver' : 'Assigned Vendor', value: op.driverName || op.vendorName || 'Assigned Partner' },
            { label: 'Vehicle / Contact', value: op.vehicleDetails || op.driverMobile || 'Assigned Details' }
        ]
    ]);

    // Security warning box
    checkPageSpace(doc, 40);
    const startX = 40;
    const startY = doc.y;
    const width = doc.page.width - 80;
    const height = 35;

    doc.save();
    doc.roundedRect(startX, startY, width, height, 4).fillAndStroke(BRAND.lightRed, BRAND.borderRed);
    doc.fillColor(BRAND.red)
       .font('Helvetica-Bold')
       .fontSize(8.5)
       .text('SECURITY NOTE: Internal financial details, margins, and customer payment information are strictly excluded from operational assignment sheets.', startX + 10, startY + 11, {
           width: width - 20,
           lineBreak: true
       });
    doc.restore();
    doc.y = startY + height + 15;
}

function buildInternalFinancialReportDocument(doc, data) {
    const f = data.financial || data;
    const ref = data.documentId || f.bookingId || 'FIN-REPORT';

    drawBrandHeader(doc);
    drawTitleBanner(doc, 'CEO INTERNAL BOOKING FINANCIAL AUDIT REPORT', `Ref: ${ref} (CONFIDENTIAL)`, '#1E1B4B', '#E0E7FF', '#312E81');

    drawSectionHeader(doc, 'Confidential Financial Breakdown');

    const total = Number(f.totalAmount || 0);
    const paid = Number(f.paidAmount || 0);
    const plannedCost = Number(f.plannedVendorCost || 0);
    const actualCost = Number(f.actualVendorCost || 0);
    const expenses = Number(f.expenses || 0);
    const comm = Number(f.commission || 0);
    const expectedProfit = Number(f.expectedProfit !== undefined ? f.expectedProfit : (total - plannedCost));
    const actualProfit = Number(f.actualProfit !== undefined ? f.actualProfit : (paid - actualCost - expenses + comm));

    const width = doc.page.width - 80;
    const colWidths = [width - 160, 160];
    const headers = ['Financial Metric', 'Amount'];
    const rows = [
        ['Quoted Customer Package Price', formatCurrency(total)],
        ['Customer Payments Received', formatCurrency(paid)],
        ['Planned Vendor Expense Budget', formatCurrency(plannedCost)],
        ['Actual Vendor Expenses Incurred', formatCurrency(actualCost)],
        ['Business Overhead Expenses', formatCurrency(expenses)],
        ['Shopping / Referral Commission', `+${formatCurrency(comm)}`],
        ['Expected Profit (Quoted - Planned)', formatCurrency(expectedProfit)],
        ['Actual Profit (Revenue - Expense - Overhead + Comm)', formatCurrency(actualProfit)]
    ];

    drawTable(doc, headers, rows, colWidths, ['left', 'right']);
    drawCalloutBox(doc, 'Actual Net Profit Margin:', formatCurrency(actualProfit), BRAND.lightGreen, BRAND.borderGreen, BRAND.green);
}

/**
 * Main entry point: Generates a binary PDF buffer from documentType and structured data
 */
async function generatePDFBuffer(documentType, data, options = {}) {
    if (!documentType || typeof documentType !== 'string') {
        throw new Error('generatePDFBuffer requires a valid documentType string');
    }

    const payload = data || {};

    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'A4',
            autoFirstPage: true,
            bufferPages: true,
            margins: { top: 40, bottom: 50, left: 40, right: 40 }
        });

        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        try {
            switch (documentType) {
                case 'QUOTE_PDF':
                case 'QUOTE':
                    buildQuoteDocument(doc, payload);
                    break;
                case 'BOOKING_CONFIRMATION':
                    buildBookingConfirmationDocument(doc, payload);
                    break;
                case 'TRAVEL_VOUCHER':
                    buildTravelVoucherDocument(doc, payload);
                    break;
                case 'PAYMENT_RECEIPT':
                    buildPaymentReceiptDocument(doc, payload);
                    break;
                case 'CUSTOMER_INVOICE':
                case 'TAX_INVOICE':
                    buildCustomerInvoiceDocument(doc, payload);
                    break;
                case 'DRIVER_OPERATIONS_SHEET':
                case 'DRIVER_SHEET':
                    buildOperationsSheetDocument(doc, payload, 'DRIVER');
                    break;
                case 'VENDOR_OPERATIONS_SHEET':
                    buildOperationsSheetDocument(doc, payload, 'VENDOR');
                    break;
                case 'INTERNAL_FINANCIAL_REPORT':
                    buildInternalFinancialReportDocument(doc, payload);
                    break;
                default:
                    // Safe fallback for recognized alias or booking confirmation
                    buildBookingConfirmationDocument(doc, payload);
                    break;
            }

            // Stamp footers with page count across all pages
            stampAllFooters(doc);

            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    generatePDFBuffer,
    formatCurrency
};
