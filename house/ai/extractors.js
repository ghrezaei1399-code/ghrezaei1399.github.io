const Extractors = {
    version: "3.0",
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
        if (!text || text.length < 20) return "خلاصه در دسترس نیست";
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        return sentences.slice(0, 3).join(" ") || text.substring(0, 200) + "...";
    },
    extractCapabilities(text) {
        if (!text || text.length < 20) return ["قابلیت ۱", "قابلیت ۲", "قابلیت ۳", "قابلیت ۴", "قابلیت ۵", "قابلیت ۶", "قابلیت ۷"];
        const keywords = ["هوش مصنوعی", "مهندسی فرهنگی", "تحول", "عدالت", "دانش", "رادیو", "تلویزیون", "نظریه", "عمل‌گرا", "ارزش"];
        const found = keywords.filter(kw => text.includes(kw));
        while (found.length < 7) found.push(`قابلیت ${found.length + 1}`);
        return found.slice(0, 7);
    }
};
