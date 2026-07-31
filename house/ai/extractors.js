const Extractors = {
    version: "2.4",
    extract(article, fullText) {
        const text = fullText || `${article.title}. ${article.tags.join('، ')}`;
        const summary = this.generateSummary(text);
        const capabilities = this.extractCapabilities(text);
        return {
            summary: { fa: summary, en: "" },
            sevenCapabilities: { fa: capabilities, en: [] }
        };
    },
    generateSummary(text) {
        const sentences = text.split(/[.!؟]/).filter(s => s.trim().length > 10);
        return sentences.slice(0, 3).join('. ') || 'خلاصه در دسترس نیست';
    },
    extractCapabilities(text) {
        const keywords = ["هوش مصنوعی", "مهندسی فرهنگی", "تحول", "عدالت", "دانش", "رادیو", "تلویزیون", "نظریه", "عمل‌گرا", "ارزش"];
        const found = keywords.filter(kw => text.includes(kw));
        while (found.length < 7) found.push(`قابلیت ${found.length + 1}`);
        return found.slice(0, 7);
    }
};
