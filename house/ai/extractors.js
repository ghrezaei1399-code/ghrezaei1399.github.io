const Extractors = {
    version: "2.1",
    extract(article, fullText) {
        // ۱. خلاصه‌برداری از بخش‌های اصلی
        const summary = this.generateSummary(fullText);
        // ۲. استخراج هفت قابلیت
        const capabilities = this.extractCapabilities(fullText);
        return {
            summary: { fa: summary, en: "" },
            sevenCapabilities: { fa: capabilities, en: [] }
        };
    },
    generateSummary(text) {
        // پیدا کردن بخش‌های کلیدی (مقدمه، یافته‌ها، نتیجه‌گیری)
        const intro = this.extractSection(text, "مقدمه");
        const findings = this.extractSection(text, "یافته");
        const conclusion = this.extractSection(text, "نتیجه‌گیری");
        // ترکیب جملات کلیدی
        let summary = "";
        if (intro) summary += intro.slice(0, 3).join(" ") + " ";
        if (findings) summary += findings.slice(0, 2).join(" ") + " ";
        if (conclusion) summary += conclusion.slice(0, 1).join(" ") + " ";
        return summary.trim() || "خلاصه در دسترس نیست";
    },
    extractSection(text, keyword) {
        // یافتن بخش‌های حاوی کلمه کلیدی و استخراج جملات
        const lines = text.split("\n");
        const section = [];
        let found = false;
        for (const line of lines) {
            if (line.includes(keyword)) found = true;
            if (found && line.trim()) {
                section.push(line.trim());
                if (section.length > 5) break;
            }
        }
        return section;
    },
    extractCapabilities(text) {
        // جستجوی مؤلفه‌های هفت‌گانه در متن
        const components = [
            { key: "مسئله", words: ["مسئله", "چالش", "مشکل"] },
            { key: "رویکرد", words: ["روش", "رویکرد", "چارچوب"] },
            { key: "نظریه پایه", words: ["نظریه", "چارچوب نظری"] },
            { key: "نوآوری", words: ["نوآوری", "ابتکار", "جدید"] },
            { key: "کاربرد", words: ["کاربرد", "استفاده", "پیاده‌سازی"] },
            { key: "پیامد", words: ["پیامد", "تأثیر", "نتیجه"] },
            { key: "چشم‌انداز", words: ["چشم‌انداز", "آینده", "راه‌کار"] }
        ];
        const capabilities = [];
        for (const comp of components) {
            let found = false;
            for (const word of comp.words) {
                if (text.includes(word)) {
                    // استخراج جمله حاوی کلمه کلیدی
                    const sentences = text.split(/[.!؟]/);
                    for (const sentence of sentences) {
                        if (sentence.includes(word)) {
                            capabilities.push(sentence.trim());
                            found = true;
                            break;
                        }
                    }
                }
                if (found) break;
            }
            if (!found) {
                capabilities.push(`قابلیت مرتبط با ${comp.key} در مقاله یافت نشد.`);
            }
        }
        return capabilities.slice(0, 7);
    }
};
