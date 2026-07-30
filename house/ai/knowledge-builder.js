const KnowledgeBuilder = {
    version: "2.0",
    async build(article, pdfText) {
        const summary = pdfText && pdfText.length > 20 ? pdfText.substring(0, 200) + "..." : "خلاصه در دسترس نیست";
        const capabilities = pdfText && pdfText.length > 20 ? this.extractCapabilities(pdfText) : [];
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
                state: "اولیه", // مقدار اولیه
                score: 0,
                lastUpdate: new Date().toISOString(),
                history: [{ action: "registered", time: new Date().toISOString() }]
            }
        };
    },
    extractCapabilities(text) {
        return [
            "مهندسی فرهنگی در عصر هوش مصنوعی",
            "تعامل انسان و ماشین",
            "همراهان روشنایی",
            "چارچوب نوآورانه",
            "مدیریت دانش",
            "هوش مصنوعی همگانی",
            "رادیوتلویزیون هوشمند"
        ];
    },
    updateState(memory) {
        // به‌روزرسانی مرحله بر اساس روابط
        for (const id in memory.articles) {
            const article = memory.articles[id];
            const relations = article.relations || {};
            let hasRelation = false;
            let relationTypes = [];
            if (relations.articles && relations.articles.length > 0) {
                hasRelation = true;
                relationTypes.push("مقاله");
            }
            if (relations.books && relations.books.length > 0) {
                hasRelation = true;
                relationTypes.push("کتاب");
            }
            if (relations.posters && relations.posters.length > 0) {
                hasRelation = true;
                relationTypes.push("پوستر");
            }
            if (relations.rooms && relations.rooms.length > 0) {
                hasRelation = true;
                relationTypes.push("اتاق");
            }
            if (hasRelation) {
                article.ai.state = `پیوند با ${relationTypes.join("، ")}`;
            } else {
                article.ai.state = "اولیه";
            }
            article.ai.lastUpdate = new Date().toISOString();
        }
    }
};
