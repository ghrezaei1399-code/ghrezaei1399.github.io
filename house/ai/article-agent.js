const ArticleAgent = {
    name: "Article Reader",
    version: "4.1",
    async scan(memory) {
        console.log("ArticleAgent started");
        const response = await fetch("library.json");
        const library = await response.json();
        let scanned = 0, processed = 0;
        for (const article of library.articles) {
            scanned++;
            if (!memory.articles[article.id]) {
                // خواندن فایل JSON تولیدشده توسط پایتون
                const jsonFile = article.file.replace('.pdf', '.ai.json');
                try {
                    const jsonResponse = await fetch(jsonFile);
                    const articleData = await jsonResponse.json();
                    // تبدیل داده به ساختار مورد انتظار
                    const newArticle = {
                        id: article.id,
                        type: article.type,
                        language: article.language,
                        title: { fa: article.title, en: "" },
                        source: article.file,
                        summary: { fa: articleData.summary || "خلاصه در دسترس نیست", en: "" },
                        sevenCapabilities: { fa: articleData.seven_factors || [], en: [] },
                        keywords: { fa: article.tags || [], en: [] },
                        project: article.project,
                        domain: article.domain,
                        priority: article.priority,
                        relations: { books: [], articles: [], posters: [], rooms: [], products: [], people: [], organizations: [] },
                        ai: { stage: 1, state: "اولیه", score: 0, lastUpdate: new Date().toISOString(), history: [{ action: "registered", time: new Date().toISOString() }] }
                    };
                    memory.articles[article.id] = newArticle;
                    processed++;
                } catch (e) {
                    console.warn("خطا در خواندن فایل JSON مقاله:", e);
                    // استفاده از داده‌های پیش‌فرض
                    const newArticle = await KnowledgeBuilder.build(article, "متن مقاله در دسترس نیست");
                    memory.articles[article.id] = newArticle;
                    processed++;
                }
            }
        }
        memory.statistics.totalArticles = scanned;
        memory.statistics.processedArticles = Object.keys(memory.articles).length;
        return { scanned, processed };
    }
};
