// hooshi1.js - نسخه ساده‌شده با پشتیبانی از همه اشیاء
const SmartProcessor = {
    version: "1.1",

    async processAll(memory) {
        const library = await this.loadLibrary();
        if (!library) return;

        // پردازش مقالات
        if (library.articles) {
            for (const article of library.articles) {
                await this.processArticle(article, memory);
            }
        }

        // پردازش کتاب‌ها
        if (library.books) {
            for (const book of library.books) {
                await this.processBook(book, memory);
            }
        }

        // پردازش پوسترها
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
        // استفاده از article-agent برای پردازش
        // (این کار توسط ArticleAgent.scan انجام می‌شود)
    },

    async processBook(book, memory) {
        if (memory.books[book.id]) return;
        memory.books[book.id] = {
            id: book.id,
            type: "book",
            title: book.title,
            author: book.author || "نامشخص",
            publisher: book.publisher || "نامشخص",
            year: book.year || "نامشخص",
            summary: book.summary || "خلاصه در دسترس نیست",
            price: book.price || "تماس بگیرید",
            source: book.file,
            relations: { books: [], articles: [], posters: [], rooms: [], products: [], people: [], organizations: [] },
            ai: { stage: 1, state: "اولیه", score: 0, lastUpdate: new Date().toISOString(), history: [{ action: "registered", time: new Date().toISOString() }] }
        };
    },

    async processPoster(poster, memory) {
        if (memory.posters[poster.id]) return;
        memory.posters[poster.id] = {
            id: poster.id,
            type: "poster",
            title: poster.title,
            description: poster.description || "توضیح در دسترس نیست",
            date: poster.date || "نامشخص",
            source: poster.file,
            relations: { books: [], articles: [], posters: [], rooms: [], products: [], people: [], organizations: [] },
            ai: { stage: 1, state: "اولیه", score: 0, lastUpdate: new Date().toISOString(), history: [{ action: "registered", time: new Date().toISOString() }] }
        };
    },

    updateStatistics(memory) {
        memory.statistics.totalArticles = Object.keys(memory.articles).length;
        memory.statistics.processedArticles = Object.keys(memory.articles).length;
        memory.statistics.totalBooks = Object.keys(memory.books).length;
        memory.statistics.totalPosters = Object.keys(memory.posters).length;
        memory.statistics.knowledgeNodes = Object.keys(memory.articles).length + Object.keys(memory.books).length + Object.keys(memory.posters).length;
    }
};

// اصلاح ArticleAgent برای استفاده از SmartProcessor
const originalScan = ArticleAgent.scan;
ArticleAgent.scan = async function(memory) {
    console.log("ArticleAgent started with SmartProcessor v1.1");
    await SmartProcessor.processAll(memory);
    return { scanned: Object.keys(memory.articles).length, processed: 0 };
};
