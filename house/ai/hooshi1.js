// hooshi1.js - بازیگر هوشمند مرکزی (نسخه ساده‌شده)
const SmartProcessor = {
    version: "1.0",

    // پردازش همه اشیاء دانش
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

        // به‌روزرسانی آمار
        this.updateStatistics(memory);
        return memory;
    },

    // بارگذاری library.json
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

    // پردازش مقاله
    async processArticle(article, memory) {
        if (memory.articles[article.id]) return;
        const fullText = await this.readPDF(article.file);
        const summary = this.generateSummary(fullText || article.title);
        const capabilities = this.extractCapabilities(fullText || article.title);
        memory.articles[article.id] = {
            id: article.id,
            type: "article",
            title: { fa: article.title, en: "" },
            source: article.file,
            summary: { fa: summary, en: "" },
            sevenCapabilities: { fa: capabilities, en: [] },
            keywords: { fa: article.tags || [], en: [] },
            project: article.project,
            domain: article.domain,
            priority: article.priority,
            relations: { books: [], articles: [], posters: [], rooms: [], products: [], people: [], organizations: [] },
            ai: { stage: 1, state: "اولیه", score: 0, lastUpdate: new Date().toISOString(), history: [{ action: "registered", time: new Date().toISOString() }] }
        };
    },

    // پردازش کتاب
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

    // پردازش پوستر
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

    // خواندن PDF (ساده‌شده)
    async readPDF(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) return null;
            const arrayBuffer = await response.arrayBuffer();
            const pdf = await pdfParse(arrayBuffer);
            return pdf.text || "";
        } catch (e) {
            console.warn("خطا در خواندن PDF:", e);
            return null;
        }
    },

    // تولید خلاصه
    generateSummary(text) {
        if (!text || text.length < 20) return "خلاصه در دسترس نیست";
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        return sentences.slice(0, 2).join(" ") || text.substring(0, 100) + "...";
    },

    // استخراج قابلیت‌ها
    extractCapabilities(text) {
        if (!text || text.length < 20) return ["قابلیت ۱", "قابلیت ۲", "قابلیت ۳", "قابلیت ۴", "قابلیت ۵", "قابلیت ۶", "قابلیت ۷"];
        const keywords = ["هوش مصنوعی", "مهندسی فرهنگی", "تحول", "عدالت", "دانش", "رادیو", "تلویزیون", "نظریه", "عمل‌گرا", "ارزش"];
        const found = keywords.filter(kw => text.includes(kw));
        while (found.length < 7) found.push(`قابلیت ${found.length + 1}`);
        return found.slice(0, 7);
    },

    // به‌روزرسانی آمار
    updateStatistics(memory) {
        memory.statistics.totalArticles = Object.keys(memory.articles).length;
        memory.statistics.processedArticles = Object.keys(memory.articles).length;
        memory.statistics.totalBooks = Object.keys(memory.books).length;
        memory.statistics.totalPosters = Object.keys(memory.posters).length;
        memory.statistics.knowledgeNodes = Object.keys(memory.articles).length + Object.keys(memory.books).length + Object.keys(memory.posters).length;
    }
};

// =============================================
// اصلاح ArticleAgent برای استفاده از SmartProcessor
// =============================================
const originalScan = ArticleAgent.scan;
ArticleAgent.scan = async function(memory) {
    console.log("ArticleAgent started with SmartProcessor v1.0");
    await SmartProcessor.processAll(memory);
    return { scanned: Object.keys(memory.articles).length, processed: 0 };
};
