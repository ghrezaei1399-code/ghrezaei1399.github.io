// hooshi1.js - نسخه اصلاح‌شده
const SmartProcessor = {
    version: "2.1",
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
        const tags = article.tags || [];
        const sampleText = `عنوان: ${article.title}. برچسب‌ها: ${tags.join('، ')}.`;
        const extracted = {
            summary: { fa: sampleText, en: "" },
            sevenCapabilities: { fa: tags, en: [] }
        };
        const newArticle = await KnowledgeBuilder.build(article, extracted);
        memory.articles[article.id] = newArticle;
    },

    async processBook(book, memory) {
        if (memory.books[book.id]) return;
        // ساخت یک extracted کامل برای کتاب
        const extracted = {
            summary: { fa: book.summary || "خلاصه در دسترس نیست", en: "" },
            sevenCapabilities: { fa: [], en: [] }
        };
        const newBook = await KnowledgeBuilder.build(book, extracted);
        memory.books[book.id] = newBook;
    },

    async processPoster(poster, memory) {
        if (memory.posters[poster.id]) return;
        // ساخت یک extracted کامل برای پوستر
        const extracted = {
            summary: { fa: poster.description || "توضیح در دسترس نیست", en: "" },
            sevenCapabilities: { fa: [], en: [] }
        };
        const newPoster = await KnowledgeBuilder.build(poster, extracted);
        memory.posters[poster.id] = newPoster;
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
    console.log("ArticleAgent started with SmartProcessor v2.1");
    await SmartProcessor.processAll(memory);
    return { scanned: Object.keys(memory.articles).length, processed: 0 };
};
