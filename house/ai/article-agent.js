const ArticleAgent = {

    name: "Article Reader",

    version: "3.2",

    async scan(memory) {

        console.log("ArticleAgent started");

        const response = await fetch("library.json");

        const library = await response.json();

        let scanned = 0;

        let processed = 0;

        for (const article of library.articles) {

            scanned++;

            delete memory.articles[article.title];
            delete memory.articles[article.title?.fa];

            if (!memory.articles[article.id]) {

                // استفاده از متن نمونه به جای خواندن PDF
                const sampleText = "این یک متن نمونه از مقاله هوشمندسازی همراهان روشنایی است. این مقاله به بررسی چارچوبی نوآورانه برای مهندسی فرهنگی در عصر هوش مصنوعی می‌پردازد و راهکارهایی برای تعامل انسان و ماشین ارائه می‌دهد.";

                const newArticle = await KnowledgeBuilder.build(article, sampleText);
                memory.articles[article.id] = newArticle;
                processed++;

            } else {

                const node = memory.articles[article.id];
                node.project = article.project;
                node.domain = article.domain;
                node.priority = article.priority;
                node.keywords.fa = article.tags || [];
                node.source = article.file;
                node.ai.lastUpdate = new Date().toISOString();
                node.id = article.id;

            }

            article.status = "indexed";

        }

        memory.statistics.totalArticles = scanned;
        memory.statistics.processedArticles = Object.keys(memory.articles).length;

        return { scanned, processed };

    }

};
۲. knowledge-builder.js را نیز به‌روزرسانی کنید تا خلاصه و قابلیت‌ها را از متن نمونه تولید کند:

javascript
const KnowledgeBuilder = {
    version: "1.3",
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
