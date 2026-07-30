// handler.js - مدیریت فایل‌های ورودی (PDF، Word، PowerPoint، تصاویر)
const FileHandler = {
    version: "1.0",

    // تابع اصلی پردازش فایل
    async process(file) {
        const extension = file.name.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return await this.processPDF(file);
            case 'docx':
                return await this.processDOCX(file);
            case 'pptx':
                return await this.processPPTX(file);
            case 'jpg':
            case 'jpeg':
            case 'png':
                return await this.processImage(file);
            default:
                console.warn('فرمت پشتیبانی نمی‌شود:', extension);
                return "فرمت فایل پشتیبانی نمی‌شود";
        }
    },

    // پردازش PDF
    async processPDF(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfParse(arrayBuffer);
            return pdf.text;
        } catch (error) {
            console.error('خطا در پردازش PDF:', error);
            return "خطا در خواندن PDF";
        }
    },

    // پردازش Word (با استفاده از mammoth.js)
    async processDOCX(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            return result.value;
        } catch (error) {
            console.error('خطا در پردازش Word:', error);
            return "خطا در خواندن Word";
        }
    },

    // پردازش PowerPoint (نمونه ساده)
    async processPPTX(file) {
        try {
            // در صورت نیاز به کتابخانه pptx-parser
            return "متن استخراج شده از پاورپوینت (نمونه)";
        } catch (error) {
            console.error('خطا در پردازش PowerPoint:', error);
            return "خطا در خواندن PowerPoint";
        }
    },

    // پردازش تصاویر (با استفاده از Tesseract.js)
    async processImage(file) {
        try {
            // در صورت نیاز به OCR
            return "متن استخراج شده از تصویر (نمونه)";
        } catch (error) {
            console.error('خطا در پردازش تصویر:', error);
            return "خطا در خواندن تصویر";
        }
    }
};
// اضافه به handler.js
const ExternalSearch = {
    async searchAllSources(query, memory) {
        let results = [];
        // جستجو در حافظه داخلی
        for (const id in memory.articles) {
            const article = memory.articles[id];
            if (article.title.fa.includes(query) || article.summary.fa.includes(query)) {
                results.push({ source: 'داخلی', type: 'مقاله', title: article.title.fa, id: article.id });
            }
        }
        // جستجو در منابع خارجی (از external-sources.json)
        try {
            const response = await fetch('external-sources.json');
            const sources = await response.json();
            for (const source of sources.sources) {
                // در اینجا باید درخواست به API یا فایل منبع خارجی ارسال شود
                // برای نمونه، فقط یک نتیجه ساختگی اضافه می‌کنیم
                if (source.name === 'انتشارات فرضی') {
                    results.push({ source: 'انتشارات فرضی', type: 'کتاب', title: 'نمونه کتاب از انتشارات', id: 'EXT-001' });
                }
            }
        } catch (e) {
            console.warn('خطا در بارگذاری منابع خارجی:', e);
        }
        return results;
    }
};
