// hooshi1.js - نسخه با تشخیص خودکار مسیر
const SmartProcessor = {
    version: "3.1",

    async processArticle(article, memory) {
        // ساخت مسیر کامل بر اساس آدرس فعلی
        const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
        const filePath = this.resolvePath(article.file, basePath);
        
        let fullText = await this.readPDF(filePath);
        if (!fullText || fullText.length < 20) {
            fullText = `${article.title}. ${article.tags.join('، ')}`;
        }

        const summary = this.extractSummary(fullText);
        const capabilities = this.extractCapabilities(fullText);
        const keywords = this.extractKeywords(fullText);

        return {
            id: article.id,
            type: article.type,
            language: article.language,
            title: { fa: article.title, en: "" },
            source: article.file,
            summary: { fa: summary, en: "" },
            sevenCapabilities: { fa: capabilities, en: [] },
            keywords: { fa: keywords, en: [] },
            project: article.project,
            domain: article.domain,
            priority: article.priority,
            relations: {
                books: [],
                articles: [],
                posters: [],
                rooms: [],
                products: [],
                people: [],
                organizations: []
            },
            ai: {
                stage: 1,
                state: "اولیه",
                score: 0,
                lastUpdate: new Date().toISOString(),
                history: [{ action: "registered", time: new Date().toISOString() }]
            }
        };
    },

    // تابع تشخیص خودکار مسیر
    resolvePath(filePath, basePath) {
        // اگر مسیر با / شروع شده، از ریشه سایت استفاده کن
        if (filePath.startsWith('/')) {
            // نام مخزن را از آدرس فعلی استخراج کن
            const repoName = window.location.pathname.split('/')[1];
            return `/${repoName}${filePath}`;
        }
        // در غیر این صورت، مسیر نسبی را به basePath اضافه کن
        return basePath + filePath;
    },

    async readPDF(filePath) {
        try {
            console.log('تلاش برای خواندن:', filePath);
            const response = await fetch(filePath);
            if (!response.ok) {
                console.warn('فایل پیدا نشد:', filePath);
                return null;
            }
            const arrayBuffer = await response.arrayBuffer();
            if (typeof pdfParse === 'undefined') {
                console.warn('pdfParse در دسترس نیست');
                return null;
            }
            const pdf = await pdfParse(arrayBuffer);
            let text = pdf.text || '';
            if (text.length < 10 && pdf.pages) {
                text = pdf.pages.map(p => p.text || '').join('\n');
            }
            return text;
        } catch (e) {
            console.warn('خطا در خواندن PDF:', e);
            return null;
        }
    },

    // بقیه توابع مانند قبل (extractSummary, extractCapabilities, extractKeywords, buildRelations, calculateSimilarity)
    // ... (همان کدهای قبلی برای این توابع)
};

// =============================================
// بهبود ArticleAgent با مسیر خودکار
// =============================================
const originalScan = ArticleAgent.scan;
ArticleAgent.scan = async function(memory) {
    console.log("ArticleAgent started with SmartProcessor v3.1 (Auto Path Resolution)");

    const response = await fetch("library.json");
    const library = await response.json();
    let scanned = 0, processed = 0;

    for (const article of library.articles) {
        scanned++;
        if (!memory.articles[article.id]) {
            const newArticle = await SmartProcessor.processArticle(article, memory);
            memory.articles[article.id] = newArticle;
            processed++;
        }
    }

    SmartProcessor.buildRelations(memory);

    memory.statistics.totalArticles = scanned;
    memory.statistics.processedArticles = Object.keys(memory.articles).length;

    return { scanned, processed };
};
