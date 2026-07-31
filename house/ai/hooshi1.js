// hooshi1.js - نسخه با الگوریتم‌های تحلیل متن
const SmartProcessor = {
    version: "3.0",

    async processArticle(article, memory) {
        let fullText = await this.readPDF(article.file);
        if (!fullText || fullText.length < 20) {
            fullText = `${article.title}. ${article.tags.join('، ')}`;
        }

        // تحلیل و استخراج با الگوریتم
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

    async readPDF(filePath) {
        try {
            const response = await fetch('/ghrezaei1399.github.io' + filePath);
            if (!response.ok) return null;
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

    // ============================================================
    // الگوریتم استخراج خلاصه (بر اساس ساختار متن)
    // ============================================================
    extractSummary(text) {
        if (!text || text.length < 20) return 'خلاصه در دسترس نیست';

        // 1. پاکسازی متن
        const cleanText = text.replace(/\s+/g, ' ').trim();
        
        // 2. شناسایی بخش‌های کلیدی با الگوهای ساختاری
        const patterns = [
            { regex: /چکیده[:\s]+([^.!?]*[.!?])/i, weight: 5 },
            { regex: /خلاصه[:\s]+([^.!?]*[.!?])/i, weight: 5 },
            { regex: /مقدمه[:\s]+([^.!?]*[.!?])/i, weight: 4 },
            { regex: /هدف[:\s]+([^.!?]*[.!?])/i, weight: 4 },
            { regex: /نتیجه[:\s]+([^.!?]*[.!?])/i, weight: 4 },
            { regex: /یافته[:\s]+([^.!?]*[.!?])/i, weight: 3 },
            { regex: /این مقاله[^.!?]*[.!?]/i, weight: 3 },
            { regex: /پژوهش[^.!?]*[.!?]/i, weight: 3 }
        ];

        let summaryParts = [];
        let usedSentences = new Set();

        // 3. استخراج جملات از بخش‌های کلیدی
        for (const pattern of patterns) {
            const matches = cleanText.match(pattern.regex);
            if (matches) {
                for (const match of matches) {
                    const sentence = match.trim();
                    if (sentence.length > 20 && !usedSentences.has(sentence)) {
                        summaryParts.push({ text: sentence, weight: pattern.weight });
                        usedSentences.add(sentence);
                    }
                }
            }
        }

        // 4. اگر چیزی پیدا نشد، از جملات اولیه متن استفاده کن
        if (summaryParts.length === 0) {
            const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [];
            for (let i = 0; i < Math.min(3, sentences.length); i++) {
                const sentence = sentences[i].trim();
                if (sentence.length > 20) {
                    summaryParts.push({ text: sentence, weight: 2 });
                }
            }
        }

        // 5. انتخاب بهترین جملات بر اساس وزن
        summaryParts.sort((a, b) => b.weight - a.weight);
        const selected = summaryParts.slice(0, 3);
        
        // 6. ساخت خلاصه نهایی
        let summary = selected.map(item => item.text).join(' ');
        
        // 7. محدود کردن طول
        if (summary.length > 350) {
            summary = summary.substring(0, 350) + '...';
        }

        return summary || 'خلاصه در دسترس نیست';
    },

    // ============================================================
    // الگوریتم استخراج هفت قابلیت (بر اساس مؤلفه‌های ساختاری)
    // ============================================================
    extractCapabilities(text) {
        if (!text || text.length < 20) {
            return ['قابلیت ۱', 'قابلیت ۲', 'قابلیت ۳', 'قابلیت ۴', 'قابلیت ۵', 'قابلیت ۶', 'قابلیت ۷'];
        }

        const cleanText = text.replace(/\s+/g, ' ').trim();
        
        // 1. تعریف مؤلفه‌های هفت‌گانه با الگوهای جستجو
        const components = [
            { 
                name: 'مسئله', 
                patterns: [
                    /مسئله[^.!?]*[.!?]/i,
                    /چالش[^.!?]*[.!?]/i,
                    /مشکل[^.!?]*[.!?]/i,
                    /پرسش[^.!?]*[.!?]/i
                ]
            },
            { 
                name: 'رویکرد', 
                patterns: [
                    /روش[^.!?]*[.!?]/i,
                    /رویکرد[^.!?]*[.!?]/i,
                    /چارچوب[^.!?]*[.!?]/i,
                    /مدل[^.!?]*[.!?]/i
                ]
            },
            { 
                name: 'نظریه پایه', 
                patterns: [
                    /نظریه[^.!?]*[.!?]/i,
                    /چارچوب نظری[^.!?]*[.!?]/i,
                    /پارادایم[^.!?]*[.!?]/i,
                    /مبانی نظری[^.!?]*[.!?]/i
                ]
            },
            { 
                name: 'نوآوری', 
                patterns: [
                    /نوآوری[^.!?]*[.!?]/i,
                    /ابتکار[^.!?]*[.!?]/i,
                    /جدید[^.!?]*[.!?]/i,
                    /ارائه[^.!?]*[.!?]/i,
                    /معرفی[^.!?]*[.!?]/i
                ]
            },
            { 
                name: 'کاربرد', 
                patterns: [
                    /کاربرد[^.!?]*[.!?]/i,
                    /استفاده[^.!?]*[.!?]/i,
                    /پیاده‌سازی[^.!?]*[.!?]/i,
                    /اجرا[^.!?]*[.!?]/i
                ]
            },
            { 
                name: 'پیامد', 
                patterns: [
                    /پیامد[^.!?]*[.!?]/i,
                    /تأثیر[^.!?]*[.!?]/i,
                    /نتیجه[^.!?]*[.!?]/i,
                    /دستاورد[^.!?]*[.!?]/i
                ]
            },
            { 
                name: 'چشم‌انداز', 
                patterns: [
                    /چشم‌انداز[^.!?]*[.!?]/i,
                    /آینده[^.!?]*[.!?]/i,
                    /راه‌کار[^.!?]*[.!?]/i,
                    /پیشنهاد[^.!?]*[.!?]/i
                ]
            }
        ];

        const capabilities = [];

        // 2. جستجوی هر مؤلفه در متن
        for (const comp of components) {
            let found = false;
            for (const pattern of comp.patterns) {
                const match = cleanText.match(pattern);
                if (match) {
                    const sentence = match[0].trim();
                    if (sentence.length > 10) {
                        capabilities.push(sentence);
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                capabilities.push(`قابلیت مرتبط با ${comp.name} یافت نشد`);
            }
        }

        return capabilities.slice(0, 7);
    },

    // ============================================================
    // الگوریتم استخراج کلیدواژه‌ها (بر اساس تکرار و اهمیت)
    // ============================================================
    extractKeywords(text) {
        if (!text || text.length < 20) return [];

        const cleanText = text.replace(/[،؛:,.؟!()""]/g, ' ').replace(/\s+/g, ' ').trim();
        const words = cleanText.split(' ').filter(w => w.length > 2);
        if (words.length === 0) return [];

        // 1. شمارش تکرار
        const frequency = {};
        for (const w of words) {
            frequency[w] = (frequency[w] || 0) + 1;
        }

        // 2. حذف کلمات بی‌معنی
        const stopWords = ['و', 'از', 'به', 'برای', 'با', 'در', 'این', 'آن', 'که', 'را', 'های', 'عنوان', 'هم', 'چون', 'می', 'شد', 'شود', 'کرد', 'کند', 'دارد', 'است', 'نیز'];
        const filtered = Object.keys(frequency)
            .filter(w => !stopWords.includes(w) && w.length > 2)
            .sort((a, b) => frequency[b] - frequency[a]);

        // 3. انتخاب ۵ تا ۷ کلمه برتر
        const keywords = filtered.slice(0, 7);
        
        // 4. اگر کلمات کافی نیست، از پرتکرارترین کلمات استفاده کن
        if (keywords.length < 3) {
            const allWords = Object.keys(frequency).filter(w => w.length > 2);
            allWords.sort((a, b) => frequency[b] - frequency[a]);
            return allWords.slice(0, 7);
        }

        return keywords;
    },

    // ============================================================
    // الگوریتم ایجاد روابط (بر اساس شباهت محتوایی)
    // ============================================================
    buildRelations(memory) {
        const ids = Object.keys(memory.articles);
        let created = 0;
        const relationSet = new Set();

        for (let i = 0; i < ids.length; i++) {
            for (let j = i + 1; j < ids.length; j++) {
                const a = memory.articles[ids[i]];
                const b = memory.articles[ids[j]];
                if (a.id === b.id) continue;

                // محاسبه شباهت با استفاده از کلیدواژه‌ها و خلاصه
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

        // به‌روزرسانی مرحله
        for (const id in memory.articles) {
            const article = memory.articles[id];
            if (article.relations?.articles?.length > 0) {
                article.ai.state = `پیوند با مقاله (${article.relations.articles.length} مورد)`;
            } else {
                article.ai.state = "اولیه";
            }
        }

        memory.statistics.knowledgeEdges = relationSet.size;
        memory.statistics.knowledgeNodes = Object.keys(memory.articles).length;

        return { created };
    },

    calculateSimilarity(a, b) {
        let keywordScore = 0;
        if (a.keywords?.fa && b.keywords?.fa) {
            const common = a.keywords.fa.filter(k => 
                b.keywords.fa.some(w => w.toLowerCase() === k.toLowerCase())
            );
            keywordScore = common.length / Math.max(a.keywords.fa.length, b.keywords.fa.length, 1);
        }

        let summaryScore = 0;
        if (a.summary?.fa && b.summary?.fa) {
            const wordsA = a.summary.fa.split(/[\s،,.;:]+/).filter(w => w.length > 3);
            const wordsB = b.summary.fa.split(/[\s،,.;:]+/).filter(w => w.length > 3);
            if (wordsA.length > 0 && wordsB.length > 0) {
                const common = wordsA.filter(w => 
                    wordsB.some(w2 => w2.toLowerCase() === w.toLowerCase())
                );
                summaryScore = common.length / Math.max(wordsA.length, wordsB.length, 1);
            }
        }

        return (keywordScore * 0.6) + (summaryScore * 0.4);
    }
};

// ============================================================
// بهبود ArticleAgent
// ============================================================
const originalScan = ArticleAgent.scan;
ArticleAgent.scan = async function(memory) {
    console.log("ArticleAgent started with SmartProcessor v3.0 (Algorithmic Extraction)");

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
