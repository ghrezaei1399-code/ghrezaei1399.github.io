// hooshi1.js - پردازش هوشمند مقالات (نسخه اصلاح‌شده)
const SmartProcessor = {
    version: "1.0",

    async processArticle(article, memory) {
        let fullText = await this.readPDF(article.file);
        if (!fullText) {
            fullText = `${article.title}. ${article.tags.join('، ')}`;
        }

        const summary = this.generateSummary(fullText);
        const capabilities = this.extractCapabilities(fullText);

        return {
            id: article.id,
            type: article.type,
            language: article.language,
            title: { fa: article.title, en: "" },
            source: article.file,
            summary: { fa: summary, en: "" },
            sevenCapabilities: { fa: capabilities, en: [] },
            keywords: { fa: article.tags || [], en: [] },
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

    async readPDF(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) return null;
            const arrayBuffer = await response.arrayBuffer();
            const pdf = await pdfParse(arrayBuffer);
            return pdf.text;
        } catch (e) {
            console.warn('خطا در خواندن PDF:', e);
            return null;
        }
    },

    generateSummary(text) {
        const sentences = text.split(/[.!؟]/).filter(s => s.trim().length > 10);
        return sentences.slice(0, 3).join('. ') || 'خلاصه در دسترس نیست';
    },

    extractCapabilities(text) {
        const keywords = [
            "هوش مصنوعی", "مهندسی فرهنگی", "تحول", "عدالت", "دانش",
            "رادیو", "تلویزیون", "نظریه", "عمل‌گرا", "ارزش",
            "همراهان روشنایی", "مدیریت دانش", "سکوت حیرانی"
        ];
        const found = keywords.filter(kw => text.includes(kw));
        while (found.length < 7) {
            found.push(`قابلیت ${found.length + 1}`);
        }
        return found.slice(0, 7);
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

                const common = [];
                if (a.keywords?.fa && b.keywords?.fa) {
                    for (const tag of a.keywords.fa) {
                        if (b.keywords.fa.some(t => t.toLowerCase() === tag.toLowerCase())) {
                            common.push(tag);
                        }
                    }
                }

                if (common.length === 0) continue;

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

        for (const id in memory.articles) {
            const article = memory.articles[id];
            if (article.relations?.articles?.length > 0) {
                article.ai.state = "پیوند با مقاله";
            } else {
                article.ai.state = "اولیه";
            }
        }

        memory.statistics.knowledgeEdges = relationSet.size;
        memory.statistics.knowledgeNodes = Object.keys(memory.articles).length;

        return { created };
    }
};

// =============================================
// بهبود عملکرد ArticleAgent بدون بازنویسی
// =============================================

// ذخیره نسخه اصلی scan
const originalScan = ArticleAgent.scan;

// بازنویسی scan برای استفاده از SmartProcessor
ArticleAgent.scan = async function(memory) {
    console.log("ArticleAgent started with SmartProcessor");

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

    // ایجاد روابط
    SmartProcessor.buildRelations(memory);

    memory.statistics.totalArticles = scanned;
    memory.statistics.processedArticles = Object.keys(memory.articles).length;

    return { scanned, processed };
};
