const ArticleAgent = {
    name: "Article Reader",
    version: "4.2",
    async scan(memory) {
        const response = await fetch("library.json");
        const library = await response.json();
        let scanned = 0, processed = 0;
        for (const article of library.articles) {
            scanned++;
            if (!memory.articles[article.id]) {
                const jsonFile = article.file.replace('.pdf', '.ai.json');
                try {
                    const jsonResponse = await fetch(jsonFile);
                    if (!jsonResponse.ok) throw new Error('JSON not found');
                    const articleData = await jsonResponse.json();
                    const newArticle = await KnowledgeBuilder.build(article, articleData);
                    memory.articles[article.id] = newArticle;
                    processed++;
                } catch (e) {
                    console.warn("خطا در خواندن JSON، استفاده از داده پیش‌فرض:", e);
                    const newArticle = await KnowledgeBuilder.build(article, { summary: "خلاصه در دسترس نیست", seven_capabilities: [] });
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
