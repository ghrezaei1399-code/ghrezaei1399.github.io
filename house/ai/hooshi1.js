// hooshi1.js - نسخه نهایی
const SmartProcessor = {
    version: "2.0",
    async processAll(memory) {
        const library = await this.loadLibrary();
        if (!library) return;

        if (library.articles) {
            for (const article of library.articles) {
                await this.processArticle(article, memory);
            }
        }

        if (library.books) {
            for (const book of library.books) {
                await this.processBook(book, memory);
            }
        }

        if (library.posters) {
            for (const poster of library.posters) {
                await this.processPoster(poster, memory);
            }
        }

        this.updateStatistics(memory);
        return memory;
    },

    async loadLibrary() {
        try {
            const response = await fetch("library.json");
            if (!response.ok) return null;
            return await response.json();
        } catch (e) {
            console.warn("خطا در بارگذاری library.json:", e);
            return null;
        }
    },

    async processArticle(article, memory) {
        if (memory.articles[article.id]) return;
        const keywords = article.keywords || [];
        const sampleText = `عنوان: ${article.title}. نویسنده: ${article.author}. سال: ${article.year}.`;
        const extracted = {
            summary: { fa: sampleText, en: "" },
            sevenCapabilities: { fa: keywords, en: [] }
        };
        const newArticle = await KnowledgeBuilder.build(article, extracted);
        memory.articles[article.id] = newArticle;
    },

    async processBook(book, memory) {
        if (memory.books[book.id]) return;
        memory.books[book.id] = await KnowledgeBuilder.build(book, {});
    },

    async processPoster(poster, memory) {
        if (memory.posters[poster.id]) return;
        memory.posters[poster.id] = await KnowledgeBuilder.build(poster, {});
    },

    updateStatistics(memory) {
        memory.statistics.totalArticles = Object.keys(memory.articles).length;
        memory.statistics.totalBooks = Object.keys(memory.books).length;
        memory.statistics.totalPosters = Object.keys(memory.posters).length;
        memory.statistics.processedArticles = Object.keys(memory.articles).length;
        memory.statistics.knowledgeNodes = Object.keys(memory.articles).length + 
                                            Object.keys(memory.books).length + 
                                            Object.keys(memory.posters).length;
    }
};

// اصلاح ArticleAgent برای استفاده از SmartProcessor
const originalScan = ArticleAgent.scan;
ArticleAgent.scan = async function(memory) {
    console.log("ArticleAgent started with SmartProcessor v2.0");
    await SmartProcessor.processAll(memory);
    return { scanned: Object.keys(memory.articles).length, processed: 0 };
};
