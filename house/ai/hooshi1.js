// hooshi1.js - نسخه پایدار
const SmartProcessor = {
    version: "3.3",
    async processArticle(article, memory) {
        const filePath = this.resolvePath(article.file);
        let fullText = await this.readPDF(filePath);
        if (!fullText || fullText.length < 20) {
            fullText = `${article.title}. ${article.tags.join('، ')}`;
        }
        const keywords = this.extractKeywords(fullText);
        return {
            id: article.id,
            type: article.type,
            language: article.language,
            title: { fa: article.title, en: "" },
            source: article.file,
            summary: { fa: "خلاصه در دسترس نیست", en: "" },
            sevenCapabilities: { fa: ["قابلیت ۱", "قابلیت ۲", "قابلیت ۳", "قابلیت ۴", "قابلیت ۵", "قابلیت ۶", "قابلیت ۷"], en: [] },
            keywords: { fa: keywords.length > 0 ? keywords : article.tags, en: [] },
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
    resolvePath(filePath) {
        const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
        return `/${cleanPath}`;
    },
    async readPDF(filePath) {
        try {
            console.log('در حال خواندن:', filePath);
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
    extractKeywords(text) {
        if (!text || text.length < 20) return [];
        const cleanText = text.replace(/[،؛:,.؟!()""]/g, ' ').replace(/\s+/g, ' ').trim();
        const words = cleanText.split(' ').filter(w => w.length > 2);
        if (words.length === 0) return [];
        const frequency = {};
        for (const w of words) frequency[w] = (frequency[w] || 0) + 1;
        const stopWords = ['و', 'از', 'به', 'برای', 'با', 'در', 'این', 'آن', 'که', 'را', 'های', 'عنوان', 'هم'];
        const filtered = Object.keys(frequency)
            .filter(w => !stopWords.includes(w) && w.length > 2)
            .sort((a, b) => frequency[b] - frequency[a]);
        return filtered.slice(0, 7);
    },
    buildRelations(memory) {
        const ids = Object.keys(memory.articles);
        let created = 0;
        const relationSet = new Set();
        for (let i = 0; i < ids.length; i++) {
            for (let j = i + 1; j < ids.length; j++) {
                const a = memory.articles[ids[i]];
                const b = memory.articles[ids[j]];
                if (a.id === b.id) continue;
                const similarity = this.calculateSimilarity(a, b);
                if (similarity > 0.3) {
                    const key1 = `${a.id}|${b.id}`;
                    const key2 = `${b.id}|${a.id}`;
                    if (!relationSet.has(key1) && !relationSet.has(key2)) {
                        relationSet.add(key1);
                        if (!a.relations.articles.includes(b.id)) {
                            a.relations.articles.push(b.id);
                            created++;
                        }
                        if (!b.relations.articles.includes(a.id)) {
                            b.relations.articles.push(a.id);
                        }
                    }
                }
            }
        }
        for (const id in memory.articles) {
            const article = memory.articles[id];
            article.ai.state = article.relations?.articles?.length > 0 ? `پیوند با مقاله (${article.relations.articles.length} مورد)` : "اولیه";
        }
        memory.statistics.knowledgeEdges = relationSet.size;
        memory.statistics.knowledgeNodes = Object.keys(memory.articles).length;
        return { created };
    },
    calculateSimilarity(a, b) {
        let keywordScore = 0;
        if (a.keywords?.fa && b.keywords?.fa) {
            const common = a.keywords.fa.filter(k => b.keywords.fa.some(w => w.toLowerCase() === k.toLowerCase()));
            keywordScore = common.length / Math.max(a.keywords.fa.length, b.keywords.fa.length, 1);
        }
        return keywordScore;
    }
};

const originalScan = ArticleAgent.scan;
ArticleAgent.scan = async function(memory) {
    console.log("ArticleAgent started with SmartProcessor v3.3 (Simple Mode)");
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
