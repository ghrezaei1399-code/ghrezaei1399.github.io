const KnowledgeBuilder = {
    version: "1.4",
    async build(article, pdfText) {
        // تولید خلاصه از ۲۰۰ کاراکتر اول متن
        const summary = pdfText && pdfText.length > 20 
            ? pdfText.substring(0, 200) + "..." 
            : "خلاصه در دسترس نیست";
        
        // استخراج هفت قابلیت (در اینجا به عنوان نمونه)
        const capabilities = pdfText && pdfText.length > 20 
            ? this.extractCapabilities(pdfText) 
            : [];

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
        return [
            "مهندسی فرهنگی در عصر هوش مصنوعی",
            "تعامل انسان و ماشین",
            "همراهان روشنایی",
            "چارچوب نوآورانه",
            "مدیریت دانش",
            "هوش مصنوعی همگانی",
            "رادیوتلویزیون هوشمند"
        ];
    }
};
