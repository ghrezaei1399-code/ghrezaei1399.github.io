// hooshi1.js - نسخه نهایی (بدون بازنویسی ArticleAgent)
const SmartProcessor = {
    version: "1.2",

    async processAll(memory) {
        const library = await this.loadLibrary();
        if (!library) return;

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
        memory.statistics.totalBooks = Object.keys(memory.books).length;
        memory.statistics.totalPosters = Object.keys(memory.posters).length;
        memory.statistics.knowledgeNodes = Object.keys(memory.articles).length + Object.keys(memory.books).length + Object.keys(memory.posters).length;
    }
};

// =============================================
// اضافه کردن پردازش کتاب‌ها و پوسترها به ArticleAgent
// =============================================
const originalScan = ArticleAgent.scan;
ArticleAgent.scan = async function(memory) {
    // اجرای پردازش اصلی مقالات
    const result = await originalScan.call(this, memory);
    
    // پردازش کتاب‌ها و پوسترها
    await SmartProcessor.processAll(memory);
    
    return result;
};
