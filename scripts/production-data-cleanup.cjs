/**
 * scripts/production-data-cleanup.cjs
 * 
 * Safe Production Database Cleanup Tool
 * 
 * SAFETY RULES:
 * 1. DEFAULTS STRICTLY TO DRY RUN.
 * 2. Requires explicit flag: --confirm-delete-test-data
 * 3. Requires pre-existing confirmed backup flag: --backup-confirmed
 * 4. Only CLEAR_TEST records can ever be deleted.
 * 5. UNKNOWN, LIKELY_TEST, and REAL_DATA are NEVER deleted.
 * 6. Protected system accounts are NEVER touched.
 * 7. Writes deleted IDs to audit log.
 * 8. Never prints secrets or credentials.
 * 
 * Usage:
 *   node scripts/production-data-cleanup.cjs --dry-run
 *   node scripts/production-data-cleanup.cjs (defaults to dry-run)
 */

const path = require('path');
const fs = require('fs');
const { classifyRecord } = require('./production-data-inventory.cjs');

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

function sanitizeUri(uri) {
    if (!uri) return 'N/A';
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
}

async function runCleanup() {
    const args = process.argv.slice(2);
    const isDryRun = !args.includes('--confirm-delete-test-data') || args.includes('--dry-run');
    const isBackupConfirmed = args.includes('--backup-confirmed');

    console.log('=======================================================');
    console.log('🧹 PRODUCTION DATA CLEANUP UTILITY');
    console.log(`Database: ${sanitizeUri(MONGO_URI)}`);
    console.log(`Mode:     ${isDryRun ? 'DRY RUN (Simulated, Zero Deletions)' : 'LIVE EXECUTION'}`);
    console.log('=======================================================\n');

    if (!isDryRun && !isBackupConfirmed) {
        console.error('❌ SAFETY BLOCKER: Live execution requires explicit backup confirmation!');
        console.error('Run with --backup-confirmed after creating a manual snapshot in MongoDB Atlas.');
        process.exit(1);
    }

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

    const existingCollections = (await db.listCollections().toArray()).map(c => c.name);
    const candidatesToDelete = [];
    const protectedRecords = [];

    for (const collName of collectionsToScan) {
        if (!existingCollections.includes(collName)) continue;

        const coll = db.collection(collName);
        const records = await coll.find({}).toArray();

        for (const doc of records) {
            const { classification, reason } = classifyRecord(doc, collName);
            const candidateInfo = {
                id: doc._id.toString(),
                collection: collName,
                name: doc.name || doc.customerName || (doc.customerDetails && doc.customerDetails.name) || 'N/A',
                email: doc.email || doc.customerEmail || (doc.customerDetails && doc.customerDetails.email) || 'N/A',
                phone: doc.phone || doc.mobile || (doc.customerDetails && doc.customerDetails.phone) || 'N/A',
                classification,
                reason
            };

            if (classification === 'CLEAR_TEST') {
                candidatesToDelete.push(candidateInfo);
            } else {
                protectedRecords.push(candidateInfo);
            }
        }
    }

    console.log(`📊 Cleanup Candidate Summary:`);
    console.log(`  - CLEAR_TEST Candidates (Eligible for deletion): ${candidatesToDelete.length}`);
    console.log(`  - Protected Records (NEVER deleted):             ${protectedRecords.length}`);
    console.log('\nSample Eligible CLEAR_TEST Records:');
    candidatesToDelete.slice(0, 15).forEach((rec, idx) => {
        console.log(`  ${idx + 1}. [${rec.collection}] ID: ${rec.id} | Name: ${rec.name} | Email: ${rec.email} | Reason: ${rec.reason}`);
    });

    if (isDryRun) {
        console.log('\n-------------------------------------------------------');
        console.log('🛡️  DRY RUN COMPLETED:');
        console.log(`  Total eligible records identified: ${candidatesToDelete.length}`);
        console.log('  Actual records deleted: 0');
        console.log('  Database remains completely unmodified.');
        console.log('-------------------------------------------------------');
        await mongoose.disconnect();
        return { isDryRun: true, candidateCount: candidatesToDelete.length, deletedCount: 0 };
    }

    // Live Execution Block (Guarded)
    console.log(`\n⚠️ INITIATING DELETION OF ${candidatesToDelete.length} CLEAR_TEST RECORDS...`);
    const auditLogEntries = [];
    let deletedCount = 0;

    for (const rec of candidatesToDelete) {
        const coll = db.collection(rec.collection);
        const res = await coll.deleteOne({ _id: new mongoose.Types.ObjectId(rec.id) });
        if (res.deletedCount > 0) {
            deletedCount++;
            auditLogEntries.push(`${new Date().toISOString()} | DELETED | [${rec.collection}] ${rec.id} | ${rec.name} | ${rec.email} | Reason: ${rec.reason}`);
        }
    }

    const auditFilePath = path.join(__dirname, 'production-cleanup-audit.log');
    fs.appendFileSync(auditFilePath, auditLogEntries.join('\n') + '\n');

    console.log(`✅ Live deletion complete: ${deletedCount} records removed.`);
    console.log(`Audit log written to: ${auditFilePath}`);

    await mongoose.disconnect();
    return { isDryRun: false, candidateCount: candidatesToDelete.length, deletedCount };
}

if (require.main === module) {
    runCleanup()
        .then(() => process.exit(0))
        .catch(err => {
            console.error('Cleanup execution failed:', err);
            process.exit(1);
        });
}

module.exports = {
    runCleanup
};
