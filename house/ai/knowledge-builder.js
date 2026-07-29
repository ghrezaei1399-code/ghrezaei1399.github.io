const KnowledgeBuilder = {
    version: "1.2",
    async build(article, pdfText) {
        // تولید خلاصه از ۲۰۰ کاراکتر اول متن
        const summary = pdfText ? pdfText.substring(0, 200) + "..." : "خلاصه در دسترس نیست";
        // استخراج هفت قابلیت (در اینجا به عنوان نمونه)
        const capabilities = pdfText ? this.extractCapabilities(pdfText) : [];
        return {
            id: article.id,
            type: article.type,
            language: article.language,
            title: { fa: article.title, en: "" },
            source: article.file,
            summary: { fa: summary, en: "" },
            sevenCapabilities: { fa: capabilities, en: [] },
            keywords: { fa: article.tags || [], en: [] },
            project: article.project,
            domain: article.domain,
            priority: article.priority,
            relations: {
                books: [],
                articles: [],
                posters: [],
                rooms: [],
                products: [],
                people: [],
                organizations: []
            },
            ai: {
                stage: 1,
                state: "discovered",
                score: 0,
                lastUpdate: new Date().toISOString(),
                history: [{ action: "registered", time: new Date().toISOString() }]
            }
        };
    },
    extractCapabilities(text) {
        // در اینجا باید هفت قابلیت را از متن استخراج کنید
        // فعلاً یک نمونه موقت
        return ["قابلیت ۱", "قابلیت ۲", "قابلیت ۳", "قابلیت ۴", "قابلیت ۵", "قابلیت ۶", "قابلیت ۷"];
    }
};
