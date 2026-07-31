// hooshi1.js - پردازش هوشمند مقالات با الگوریتم‌های استخراج
const SmartProcessor = {
    version: "2.1",

    // ---------------------------------------------------------
    // ۱. پردازش اصلی مقاله
    // ---------------------------------------------------------
    async processArticle(article, memory) {
        let fullText = await this.readPDF(article.file);
        if (!fullText || fullText.length < 20) {
            fullText = `${article.title}. ${article.tags.join('، ')}`;
        }

        // استخراج خلاصه با الگوریتم
        const summary = this.extractSummary(fullText);
        
        // استخراج کلیدواژه‌ها با الگوریتم
        const keywords = this.extractKeywords(fullText);
        
        // استخراج هفت قابلیت با الگوریتم
        const capabilities = this.extractCapabilities(fullText, keywords);

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

    // ---------------------------------------------------------
    // ۲. خواندن PDF (همان روش موفق)
    // ---------------------------------------------------------
    async readPDF(filePath) {
        try {
            const response = await fetch(filePath);
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

    // ---------------------------------------------------------
    // ۳. الگوریتم استخراج خلاصه (بدون کلمات کلیدی از پیش تعیین‌شده)
    // ---------------------------------------------------------
    extractSummary(text) {
        if (!text || text.length < 20) return 'خلاصه در دسترس نیست';

        // ۱. تقسیم متن به پاراگراف‌ها
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 20);
        if (paragraphs.length === 0) return text.substring(0, 200) + '...';

        // ۲. امتیازدهی به پاراگراف‌ها بر اساس:
        // - طول پاراگراف (نه خیلی کوتاه، نه خیلی بلند)
        // - تعداد جملات کامل
        // - وجود کلمات کلیدی ساختاری (مقدمه، نتیجه‌گیری، یافته‌ها)
        const scored = paragraphs.map(p => {
            let score = 0;
            const sentences = p.match(/[^.!?]+[.!?]+/g) || [];
            
            // امتیاز برای تعداد جملات مناسب (بین ۲ تا ۵)
            if (sentences.length >= 2 && sentences.length <= 5) score += 3;
            else if (sentences.length > 1) score += 1;
            
            // امتیاز برای طول مناسب (بین ۵۰ تا ۳۰۰ کاراکتر)
            if (p.length >= 50 && p.length <= 300) score += 3;
            else if (p.length > 30) score += 1;
            
            // امتیاز برای کلمات ساختاری
            const structuralWords = ['مقدمه', 'نتیجه', 'یافته', 'هدف', 'چکیده', 'خلاصه', 'در این مقاله', 'پژوهش'];
            for (const word of structuralWords) {
                if (p.includes(word)) score += 2;
            }
            
            // امتیاز برای جملات کامل
            if (sentences.length > 0) score += sentences.length;
            
            return { text: p, score, sentences };
        });

        // ۳. انتخاب بهترین پاراگراف‌ها (۲ تا ۳ پاراگراف)
        scored.sort((a, b) => b.score - a.score);
        const top = scored.slice(0, 3);
        
        // ۴. ترکیب جملات منتخب
        let summary = '';
        for (const item of top) {
            const sentences = item.sentences;
            if (sentences.length > 0) {
                // از هر پاراگراف، ۲ جمله اول را بردار
                const selected = sentences.slice(0, 2).map(s => s.trim());
                summary += selected.join(' ') + ' ';
            }
        }

        // ۵. اگر خلاصه خالی بود، از کل متن استفاده کن
        if (summary.length < 20) {
            summary = text.replace(/\s+/g, ' ').substring(0, 300) + '...';
        }

        // ۶. محدود کردن طول خلاصه
        if (summary.length > 400) {
            summary = summary.substring(0, 400) + '...';
        }

        return summary.trim();
    },

    // ---------------------------------------------------------
    // ۴. الگوریتم استخراج کلیدواژه‌ها (بدون کلمات از پیش تعیین‌شده)
    // ---------------------------------------------------------
    extractKeywords(text) {
        if (!text || text.length < 20) return [];

        // ۱. پاکسازی متن
        const clean = text.replace(/[،؛:,.؟!()""]/g, ' ').replace(/\s+/g, ' ').trim();
        
        // ۲. تقسیم به کلمات
        const words = clean.split(' ').filter(w => w.length > 2);
        if (words.length === 0) return [];

        // ۳. شمارش تکرار کلمات
        const frequency = {};
        for (const w of words) {
            frequency[w] = (frequency[w] || 0) + 1;
        }

        // ۴. حذف کلمات تکراری و بی‌معنی
        const stopWords = ['و', 'از', 'به', 'برای', 'با', 'در', 'این', 'آن', 'که', 'را', 'های', 'های', 'عنوان', 'هم'];
        const sorted = Object.keys(frequency)
            .filter(w => !stopWords.includes(w) && w.length > 2)
            .sort((a, b) => frequency[b] - frequency[a]);

        // ۵. انتخاب ۵ تا ۷ کلمه کلیدی
        const keywords = sorted.slice(0, 7);
        
        // ۶. اگر کلمات کافی نیست، از کلمات پرتکرارتر استفاده کن
        if (keywords.length < 3) {
            const allWords = Object.keys(frequency).filter(w => w.length > 2);
            allWords.sort((a, b) => frequency[b] - frequency[a]);
            return allWords.slice(0, 7);
        }

        return keywords;
    },

    // ---------------------------------------------------------
    // ۵. الگوریتم استخراج هفت قابلیت (بر اساس ساختار متن)
    // ---------------------------------------------------------
    extractCapabilities(text, keywords) {
        if (!text || text.length < 20) return ['قابلیت ۱', 'قابلیت ۲', 'قابلیت ۳', 'قابلیت ۴', 'قابلیت ۵', 'قابلیت ۶', 'قابلیت ۷'];

        // ۱. پیدا کردن بخش‌های ساختاری
        const sections = this.findSections(text);
        
        // ۲. استخراج قابلیت‌ها از بخش‌ها
        const capabilities = [];
        
        // ۲-۱. از بخش‌های ساختاری
        const sectionKeywords = {
            'هدف': ['هدف', 'پرسش', 'مسئله'],
            'روش': ['روش', 'رویکرد', 'چارچوب', 'مدل'],
            'یافته': ['یافته', 'نتیجه', 'دستاورد'],
            'نوآوری': ['نوآوری', 'ابتکار', 'ارائه', 'معرفی'],
            'کاربرد': ['کاربرد', 'استفاده', 'پیاده‌سازی'],
            'پیامد': ['پیامد', 'تأثیر', 'اثر'],
            'چشم‌انداز': ['چشم‌انداز', 'آینده', 'راه‌کار', 'پیشنهاد']
        };

        for (const [cap, words] of Object.entries(sectionKeywords)) {
            for (const w of words) {
                if (text.includes(w)) {
                    // پیدا کردن جمله حاوی کلمه
                    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
                    for (const sentence of sentences) {
                        if (sentence.includes(w)) {
                            const clean = sentence.trim().replace(/\s+/g, ' ');
                            if (clean.length > 10 && !capabilities.includes(clean)) {
                                capabilities.push(clean);
                                break;
                            }
                        }
                    }
                    if (capabilities.length >= 7) break;
                }
            }
            if (capabilities.length >= 7) break;
        }

        // ۳. اگر کمتر از ۷ قابلیت پیدا شد، از کلیدواژه‌ها استفاده کن
        while (capabilities.length < 7) {
            const idx = capabilities.length;
            if (keywords && keywords[idx]) {
                capabilities.push(`قابلیت ${idx+1}: ${keywords[idx]}`);
            } else {
                capabilities.push(`قابلیت ${idx+1}`);
            }
        }

        return capabilities.slice(0, 7);
    },

    // ---------------------------------------------------------
    // ۶. پیدا کردن بخش‌های ساختاری متن
    // ---------------------------------------------------------
    findSections(text) {
        const lines = text.split('\n');
        const sections = [];
        let currentSection = '';

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            // تشخیص عنوان بخش (اعداد، کلمات کلیدی)
            if (trimmed.match(/^[\d]+[\.\-\–]?\s*[^\d]/) || 
                trimmed.match(/^[آ-ی]+[\s\-–]+/) ||
                trimmed.length < 50) {
                if (currentSection) {
                    sections.push(currentSection);
                }
                currentSection = trimmed;
            } else {
                currentSection += ' ' + trimmed;
            }
        }
        if (currentSection) sections.push(currentSection);

        return sections;
    },

    // ---------------------------------------------------------
    // ۷. الگوریتم ایجاد روابط (بر اساس شباهت محتوایی)
    // ---------------------------------------------------------
    buildRelations(memory) {
        const ids = Object.keys(memory.articles);
        let created = 0;
        const relationSet = new Set();

        for (let i = 0; i < ids.length; i++) {
            for (let j = i + 1; j < ids.length; j++) {
                const a = memory.articles[ids[i]];
                const b = memory.articles[ids[j]];
                if (a.id === b.id) continue;

                // محاسبه شباهت بر اساس کلیدواژه‌ها و خلاصه
                const similarity = this.calculateSimilarity(a, b);

                // اگر شباهت بیشتر از حد آستانه بود، رابطه ایجاد کن
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

    // ---------------------------------------------------------
    // ۸. محاسبه شباهت بین دو مقاله
    // ---------------------------------------------------------
    calculateSimilarity(a, b) {
        // ۱. شباهت بر اساس کلیدواژه‌ها
        let keywordScore = 0;
        if (a.keywords?.fa && b.keywords?.fa) {
            const common = a.keywords.fa.filter(k => 
                b.keywords.fa.some(w => w.toLowerCase() === k.toLowerCase())
            );
            keywordScore = common.length / Math.max(a.keywords.fa.length, b.keywords.fa.length);
        }

        // ۲. شباهت بر اساس خلاصه (کلمات مشترک)
        let summaryScore = 0;
        if (a.summary?.fa && b.summary?.fa) {
            const wordsA = a.summary.fa.split(/[\s،,.;:]+/).filter(w => w.length > 3);
            const wordsB = b.summary.fa.split(/[\s،,.;:]+/).filter(w => w.length > 3);
            if (wordsA.length > 0 && wordsB.length > 0) {
                const common = wordsA.filter(w => 
                    wordsB.some(w2 => w2.toLowerCase() === w.toLowerCase())
                );
                summaryScore = common.length / Math.max(wordsA.length, wordsB.length);
            }
        }

        // ۳. نمره نهایی
        return (keywordScore * 0.6) + (summaryScore * 0.4);
    }
};

// =============================================
// بهبود ArticleAgent
// =============================================
const originalScan = ArticleAgent.scan;
ArticleAgent.scan = async function(memory) {
    console.log("ArticleAgent started with SmartProcessor v2.1 (Algorithmic Extraction)");

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
