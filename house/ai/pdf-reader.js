// pdf-reader.js - خواننده اختصاصی PDF با مسیرهای درست
const PDFReader = {
    async read(filePath) {
        // ساخت مسیر بر اساس ساختار مخزن
        const baseUrl = window.location.origin;
        const repoPath = '/ghrezaei1399.github.io';
        const fullUrl = baseUrl + repoPath + filePath;
        
        try {
            console.log('تلاش برای خواندن:', fullUrl);
            const response = await fetch(fullUrl);
            if (!response.ok) {
                console.warn('فایل پیدا نشد:', fullUrl);
                return null;
            }
            const arrayBuffer = await response.arrayBuffer();
            if (typeof pdfParse === 'undefined') {
                console.warn('pdfParse در دسترس نیست');
                return null;
            }
            const pdf = await pdfParse(arrayBuffer);
            let text = pdf.text || '';
            if (text.length < 10 && pdf.pages) {
                text = pdf.pages.map(p => p.text || '').join('\n');
            }
            return text;
        } catch (e) {
            console.warn('خطا در خواندن PDF:', e);
            return null;
        }
    }
};
