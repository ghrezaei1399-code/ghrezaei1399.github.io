// brain.js - هسته اصلی سیستم
class Brain {
    constructor() {
        this.articleProcessor = articleProcessor;
        this.knowledgeBuilder = knowledgeBuilder;
        this.initialized = false;
        console.log('🧠 Brain initialized');
    }

    async initialize() {
        if (this.initialized) {
            console.log('⚠️ Brain already initialized');
            return;
        }
        
        console.log('🧠 Initializing Brain...');
        
        const libraryData = window.libraryData;
        if (!libraryData) {
            console.error('❌ libraryData not found');
            return;
        }
        
        try {
            // پردازش مقالات
            if (libraryData.articles && libraryData.articles.length > 0) {
                console.log(`📚 Processing ${libraryData.articles.length} articles...`);
                await this.articleProcessor.processAllArticles(libraryData.articles);
            }
            
            // پردازش کتاب‌ها
            if (libraryData.books && libraryData.books.length > 0) {
                console.log(`📖 Processing ${libraryData.books.length} books...`);
                this.processBooks(libraryData.books);
            }
            
            // پردازش پوسترها
            if (libraryData.posters && libraryData.posters.length > 0) {
                console.log(`🎨 Processing ${libraryData.posters.length} posters...`);
                this.processPosters(libraryData.posters);
            }
            
            this.initialized = true;
            console.log('✅ Brain initialized successfully');
            
            const stats = this.knowledgeBuilder.getStatistics();
            console.log('📊 Statistics:', stats);
            
            // نمایش در UI
            if (typeof uiDisplay !== 'undefined') {
                uiDisplay.displayKnowledge();
            }
            
        } catch (error) {
            console.error('❌ Brain initialization error:', error);
        }
    }

    processBooks(books) {
        for (const book of books) {
            const knowledge = this.knowledgeBuilder.build({
                id: `book_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
                type: 'book',
                title: book.title,
                author: book.author || 'ناشناس',
                year: book.year || new Date().getFullYear(),
                summary: book.description || 'خلاصه در دسترس نیست',
                capabilities: ['کتاب آموزشی', 'منبع معتبر'],
                keywords: book.keywords || [],
                metadata: {
                    publisher: book.publisher || 'نامشخص',
                    price: book.price || 'نامشخص',
                    processedAt: new Date().toISOString()
                },
                relations: []
            });
            console.log(`📖 Book processed: ${knowledge.title}`);
        }
    }

    processPosters(posters) {
        for (const poster of posters) {
            const knowledge = this.knowledgeBuilder.build({
                id: `poster_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
                type: 'poster',
                title: poster.title,
                author: poster.author || 'ناشناس',
                year: poster.year || new Date().getFullYear(),
                summary: poster.description || 'خلاصه در دسترس نیست',
                capabilities: ['پوستر علمی', 'نمایش بصری'],
                keywords: poster.keywords || [],
                metadata: {
                    event: poster.event || 'نامشخص',
                    price: poster.price || 'نامشخص',
                    processedAt: new Date().toISOString()
                },
                relations: []
            });
            console.log(`🎨 Poster processed: ${knowledge.title}`);
        }
    }

    getStatistics() {
        return this.knowledgeBuilder.getStatistics();
    }

    getAllKnowledge() {
        return this.knowledgeBuilder.getAllKnowledge();
    }

    getRelations() {
        return this.knowledgeBuilder.getRelations();
    }
}

// ایجاد نمونه جهانی
const brain = new Brain();

// اجرا پس از بارگذاری کامل صفحه
document.addEventListener('DOMContentLoaded', async () => {
    console.log('📄 DOM loaded, initializing brain...');
    await brain.initialize();
});

console.log('✅ Brain module loaded');
