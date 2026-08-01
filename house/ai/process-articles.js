// process-articles.js - پردازش دسته‌ای مقالات
class ArticleProcessor {
    constructor() {
        this.articleAgent = articleAgent;
        this.knowledgeBuilder = knowledgeBuilder;
        this.processed = [];
        console.log('✅ ArticleProcessor initialized');
    }

    async processAllArticles(articles) {
        console.log(`🔄 Processing ${articles.length} articles...`);
        
        if (!articles || articles.length === 0) {
            console.warn('⚠️ No articles to process');
            return [];
        }
        
        for (const article of articles) {
            try {
                const knowledge = await this.articleAgent.processArticle(article);
                if (knowledge) {
                    this.processed.push(knowledge);
                    console.log(`✅ Processed: ${knowledge.title}`);
                }
            } catch (error) {
                console.error(`❌ Failed to process ${article.title}:`, error);
            }
        }
        
        console.log(`✅ Processed ${this.processed.length}/${articles.length} articles`);
        return this.processed;
    }

    getStatistics() {
        return this.knowledgeBuilder.getStatistics();
    }

    getAllProcessed() {
        return this.processed;
    }
}

// ایجاد نمونه جهانی
const articleProcessor = new ArticleProcessor();
console.log('✅ ArticleProcessor module loaded');
