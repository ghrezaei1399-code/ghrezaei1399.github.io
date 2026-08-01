// article-agent.js - پردازش مقالات با pdf.js
class ArticleAgent {
    constructor() {
        this.pdfReader = pdfReader;
        this.extractors = extractors;
        this.knowledgeBuilder = knowledgeBuilder;
        console.log('✅ ArticleAgent initialized');
    }

    async processArticle(article) {
        try {
            console.log(`📝 Processing article: ${article.title}`);
            
            if (!article.path) {
                console.warn('⚠️ No path provided for article:', article.title);
                return this.createFallbackArticle(article, 'مسیر فایل مشخص نشده است');
            }
            
            const pdfResult = await this.pdfReader.readPDFViaFetch(article.path);
            
            if (!pdfResult.success) {
                console.error('❌ Failed to read PDF:', pdfResult.error);
                return this.createFallbackArticle(article, pdfResult.error);
            }
            
            const extracted = this.extractors.extractAll(pdfResult.text);
            
            const knowledge = this.knowledgeBuilder.build({
                type: 'article',
                title: article.title,
                author: article.author || 'Unknown',
                year: article.year || new Date().getFullYear(),
                fullText: pdfResult.text,
                summary: extracted.summary,
                capabilities: extracted.capabilities,
                keywords: extracted.keywords,
                metadata: {
                    pageCount: pdfResult.pageCount,
                    wordCount: pdfResult.wordCount || 0,
                    processedAt: new Date().toISOString(),
                    originalPath: article.path
                }
            });
            
            console.log(`✅ Article processed: ${knowledge.id}`);
            return knowledge;
            
        } catch (error) {
            console.error('❌ Article processing error:', error);
            return this.createFallbackArticle(article, error.message);
        }
    }

    createFallbackArticle(article, error) {
        return {
            id: `article_${Date.now()}`,
            type: 'article',
            title: article.title,
            author: article.author || 'Unknown',
            year: article.year || new Date().getFullYear(),
            summary: 'خلاصه در دسترس نیست - خطا در پردازش',
            capabilities: ['خطا در استخراج قابلیت‌ها'],
            fullText: '',
            keywords: [],
            error: error,
            metadata: {
                processedAt: new Date().toISOString(),
                status: 'error'
            },
            relations: []
        };
    }
}

// ایجاد نمونه جهانی
const articleAgent = new ArticleAgent();
console.log('✅ ArticleAgent module loaded');
