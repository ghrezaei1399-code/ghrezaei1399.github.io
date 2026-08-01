// article-agent.js - نسخه نهایی و پایدار
const ArticleAgent = {
    name: "Article Reader",
    version: "5.0",
    
    async scan(memory) {
        console.log("ArticleAgent started");
        
        try {
            const response = await fetch("library.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const library = await response.json();
            
            let scanned = 0;
            let processed = 0;
            
            // پردازش مقالات
            if (library.articles && Array.isArray(library.articles)) {
                for (const article of library.articles) {
                    scanned++;
                    if (!memory.articles[article.id]) {
                        // ساخت داده‌های نمونه برای نمایش
                        const keywords = article.keywords || article.tags || [];
                        const sampleText = `عنوان: ${article.title}. نویسنده: ${article.author || 'نامشخص'}. سال: ${article.year || 'نامشخص'}.`;
                        
                        const extracted = {
                            summary: { fa: sampleText, en: "" },
                            sevenCapabilities: { fa: keywords, en: [] }
                        };
                        
                        const newArticle = KnowledgeBuilder.build(article, extracted);
                        memory.articles[article.id] = newArticle;
                        processed++;
                    }
                }
            }
            
            // پردازش کتاب‌ها
            if (library.books && Array.isArray(library.books)) {
                for (const book of library.books) {
                    if (!memory.books[book.id]) {
                        const newBook = KnowledgeBuilder.build(book, {});
                        memory.books[book.id] = newBook;
                    }
                }
            }
            
            // پردازش پوسترها
            if (library.posters && Array.isArray(library.posters)) {
                for (const poster of library.posters) {
                    if (!memory.posters[poster.id]) {
                        const newPoster = KnowledgeBuilder.build(poster, {});
                        memory.posters[poster.id] = newPoster;
                    }
                }
            }
            
            // به‌روزرسانی آمار
            memory.statistics.totalArticles = Object.keys(memory.articles).length;
            memory.statistics.totalBooks = Object.keys(memory.books).length;
            memory.statistics.totalPosters = Object.keys(memory.posters).length;
            memory.statistics.processedArticles = Object.keys(memory.articles).length;
            memory.statistics.knowledgeNodes = Object.keys(memory.articles).length + 
                                                Object.keys(memory.books).length + 
                                                Object.keys(memory.posters).length;
            
            return { scanned, processed };
            
        } catch (error) {
            console.error("خطا در مقاله‌خوان:", error);
            return { scanned: 0, processed: 0 };
        }
    }
};
