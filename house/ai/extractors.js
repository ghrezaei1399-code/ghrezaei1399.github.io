const Extractors = {
    version: "2.2",
    extract(article) {
        // استفاده از عنوان و برچسب‌ها به عنوان متن جایگزین
        const fullText = `عنوان: ${article.title}. برچسب‌ها: ${article.tags.join('، ')}.`;
        // ۱. خلاصه‌برداری
        const summary = this.generateSummary(fullText);
        // ۲. استخراج هفت قابلیت
        const capabilities = this.extractCapabilities(fullText);
        return {
            summary: { fa: summary, en: "" },
            sevenCapabilities: { fa: capabilities, en: [] }
        };
    },
    generateSummary(text) {
        // استفاده از کل متن به عنوان خلاصه (موقت)
        return text.length > 200 ? text.substring(0, 200) + "..." : text;
    },
    extractCapabilities(text) {
        // استخراج کلمات کلیدی از برچسب‌ها
        const words = text.split(/[،،\s]+/);
        const uniqueWords = [...new Set(words)];
        return uniqueWords.filter(w => w.length > 3).slice(0, 7);
    }
};
