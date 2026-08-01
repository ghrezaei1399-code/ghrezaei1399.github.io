// article-agent.js - نسخه کاملاً مستقل
const ArticleAgent = {
    name: "Article Reader",
    version: "4.7",
    async scan(memory) {
        console.log("ArticleAgent started");
        const response = await fetch("library.json");
        const library = await response.json();
        let scanned = 0, processed = 0;
        for (const article of library.articles) {
            scanned++;
            if (!memory.articles[article.id]) {
                // استفاده از متن نمونه
                const sampleText = `عنوان: ${article.title}. برچسب‌ها: ${article.tags.join('، ')}.`;
                const extracted = {
                    summary: { fa: sampleText, en: "" },
                    sevenCapabilities: { fa: article.tags || [], en: [] }
                };
                const newArticle = await KnowledgeBuilder.build(article, extracted);
                memory.articles[article.id] = newArticle;
                processed++;
            }
        }
        memory.statistics.totalArticles = scanned;
        memory.statistics.processedArticles = Object.keys(memory.articles).length;
        return { scanned, processed };
    }
};
