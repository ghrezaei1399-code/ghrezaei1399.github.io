// article-agent.js - نسخه ساده بدون وابستگی اضافی
const ArticleAgent = {
    name: "Article Reader",
    version: "4.6",
    async scan(memory) {
        console.log("ArticleAgent started");
        const response = await fetch("library.json");
        const library = await response.json();
        let scanned = 0, processed = 0;
        for (const article of library.articles) {
            scanned++;
            if (!memory.articles[article.id]) {
                // استفاده از متن نمونه برای نمایش مقالات
                const sampleText = `عنوان: ${article.title}. این یک متن نمونه از مقاله است.`;
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
