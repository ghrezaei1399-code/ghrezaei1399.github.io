const KnowledgeBuilder = {
    version: "2.1",
    async build(article, pdfText) {
        // تولید خلاصه از ۲۰۰ کلمه اول متن
        let summary = "خلاصه در دسترس نیست";
        let capabilities = [];
        if (pdfText && pdfText.length > 50) {
            // استخراج ۲۰۰ کلمه اول به عنوان خلاصه
            const words = pdfText.split(/\s+/);
            summary = words.slice(0, 200).join(" ") + "...";
            
            // استخراج هفت قابلیت بر اساس کلمات کلیدی
            capabilities = this.extractCapabilities(pdfText);
        }
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
                state: "اولیه",
                score: 0,
                lastUpdate: new Date().toISOString(),
                history: [{ action: "registered", time: new Date().toISOString() }]
            }
        };
    },
    extractCapabilities(text) {
        // استخراج هفت قابلیت بر اساس کلمات کلیدی موجود در متن
        const keywords = [
            "هوش مصنوعی", "مهندسی فرهنگی", "تحول سازمانی", "عدالت دیجیتال",
            "همراهان روشنایی", "مدیریت دانش", "رادیوتلویزیون هوشمند",
            "نظریه‌پردازی", "عمل‌گرا", "سکوت حیرانی", "ارزش‌ها",
            "فرهنگ", "دانش", "تعامل", "ماشین", "انسان"
        ];
        const found = keywords.filter(kw => text.includes(kw));
        // اگر کمتر از ۷ قابلیت پیدا شد، با موارد پیش‌فرض تکمیل کن
        while (found.length < 7) {
            found.push("قابلیت استخراج‌شده");
        }
        return found.slice(0, 7);
    },
    updateState(memory) {
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
            if (hasRelation) {
                article.ai.state = `پیوند با ${relationTypes.join("، ")}`;
            } else {
                article.ai.state = "اولیه";
            }
            article.ai.lastUpdate = new Date().toISOString();
        }
    }
};
