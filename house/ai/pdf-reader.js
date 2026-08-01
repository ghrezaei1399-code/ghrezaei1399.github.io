// pdf-reader.js - خواندن فایل‌های PDF در مرورگر
class PDFReader {
    constructor() {
        this.pdfjsLib = window.pdfjsLib;
        if (!this.pdfjsLib) {
            console.error('❌ pdf.js library not loaded');
            throw new Error('PDF.js library is required');
        }
        console.log('✅ PDFReader initialized');
    }

    async readPDF(url) {
        try {
            console.log(`📄 Reading PDF: ${url}`);
            
            const loadingTask = this.pdfjsLib.getDocument(url);
            const pdf = await loadingTask.promise;
            
            let fullText = '';
            const numPages = pdf.numPages;
            console.log(`📊 PDF has ${numPages} pages`);
            
            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
            }
            
            fullText = fullText.replace(/\s+/g, ' ').trim();
            
            if (fullText.length > 0) {
                console.log(`✅ Extracted ${fullText.length} characters`);
                return {
                    success: true,
                    text: fullText,
                    pageCount: numPages,
                    wordCount: fullText.split(/\s+/).length
                };
            } else {
                console.warn('⚠️ No text extracted from PDF');
                return {
                    success: false,
                    error: 'No text content found in PDF'
                };
            }
            
        } catch (error) {
            console.error('❌ PDF reading error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async readPDFViaFetch(url) {
        try {
            console.log(`📄 Reading PDF via fetch: ${url}`);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const arrayBuffer = await response.arrayBuffer();
            const loadingTask = this.pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;
            
            let fullText = '';
            const numPages = pdf.numPages;
            
            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
            }
            
            fullText = fullText.replace(/\s+/g, ' ').trim();
            
            return {
                success: true,
                text: fullText,
                pageCount: numPages,
                wordCount: fullText.split(/\s+/).length
            };
            
        } catch (error) {
            console.error('❌ Fetch PDF error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// ایجاد نمونه جهانی
const pdfReader = new PDFReader();
console.log('✅ PDF Reader module loaded');
