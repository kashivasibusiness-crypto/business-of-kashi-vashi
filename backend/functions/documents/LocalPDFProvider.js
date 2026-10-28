const BaseDocumentProvider = require('./BaseDocumentProvider');
const { generatePDFBuffer } = require('./pdfDocumentBuilder');

class LocalPDFProvider extends BaseDocumentProvider {
    constructor() {
        super('LocalPDFProvider');
    }

    async generatePDF(documentType, data, options = {}) {
        const docId = data?.documentId || data?.bookingId || data?.quoteId || 'DOC';
        const fileName = `${documentType}_${docId}.pdf`;

        // Generate genuine binary PDF buffer using PDFKit engine
        const buffer = await generatePDFBuffer(documentType, data, options);

        return {
            buffer,
            fileName,
            providerName: this.name,
            contentType: options.contentType || 'application/pdf'
        };
    }
}

let activeProvider = new LocalPDFProvider();

function setDocumentProvider(provider) {
    activeProvider = provider;
}

function getDocumentProvider() {
    return activeProvider;
}

module.exports = {
    LocalPDFProvider,
    setDocumentProvider,
    getDocumentProvider
};
