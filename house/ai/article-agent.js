const ArticleAgent = {
    name: "Article Reader",
    version: "4.5",
    async scan(memory) {
        console.log("ArticleAgent started");
        const response = await fetch("library.json");
        const library = await response.json();
        let scanned = 0, processed = 0;
        for (const article of library.articles) {
            scanned++;
            if (!memory.articles[article.id]) {
                // استفاده از Extractors برای استخراج داده‌ها
                const extracted = await Extractors.extract(article);
                // تطابق داده‌های استخراج‌شده با ساختار مورد انتظار KnowledgeBuilder
                const newArticle = await KnowledgeBuilder.build(article, {
                    summary: extracted.summary?.fa || "خلاصه در دسترس نیست",
                    seven_capabilities: extracted.sevenCapabilities?.fa || []
                });
                memory.articles[article.id] = newArticle;
                processed++;
            }
        }
        memory.statistics.totalArticles = scanned;
        memory.statistics.processedArticles = Object.keys(memory.articles).length;
        return { scanned, processed };
    }
};
