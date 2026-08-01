// hooshi1.js - نسخه نهایی و پایدار
const SmartProcessor = {
    version: "2.0",
    
    async processAll(memory) {
        try {
            const library = await this.loadLibrary();
            if (!library) {
                console.warn("library.json پیدا نشد");
                return;
            }
            
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
            
        } catch (error) {
            console.error("خطا در پردازش هوشمند:", error);
            return memory;
        }
    },
    
    async loadLibrary() {
        try {
            const response = await fetch("library.json");
            if (!response.ok) {
                console.warn("خطا در بارگذاری library.json:", response.status);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.warn("خطا در بارگذاری library.json:", error);
            return null;
        }
    },
    
    async processArticle(article, memory) {
        if (memory.articles[article.id]) return;
        
        const keywords = article.keywords || article.tags || [];
        const sampleText = `عنوان: ${article.title}. نویسنده: ${article.author || 'نامشخص'}. سال: ${article.year || 'نامشخص'}.`;
        
        const extracted = {
            summary: { fa: sampleText, en: "" },
            sevenCapabilities: { fa: keywords, en: [] }
        };
        
        const newArticle = KnowledgeBuilder.build(article, extracted);
        memory.articles[article.id] = newArticle;
    },
    
    async processBook(book, memory) {
        if (memory.books[book.id]) return;
        const newBook = KnowledgeBuilder.build(book, {});
        memory.books[book.id] = newBook;
    },
    
    async processPoster(poster, memory) {
        if (memory.posters[poster.id]) return;
        const newPoster = KnowledgeBuilder.build(poster, {});
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
    console.log("ArticleAgent started with SmartProcessor v2.0");
    await SmartProcessor.processAll(memory);
    return { 
        scanned: Object.keys(memory.articles).length, 
        processed: Object.keys(memory.articles).length 
    };
};
