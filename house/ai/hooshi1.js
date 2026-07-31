// hooshi1.js - نسخه نهایی با خواندن صحیح PDF
const SmartProcessor = {
    version: "2.0",

    async processArticle(article, memory) {
        // ۱. خواندن متن از PDF با روش درست
        let fullText = await this.readPDF(article.file);
        
        // ۲. اگر PDF خوانده نشد، از داده‌های جایگزین استفاده کن
        if (!fullText || fullText.length < 20) {
            fullText = `${article.title}. ${article.tags.join('، ')}`;
        }

        // ۳. استخراج خلاصه و قابلیت‌ها
        const summary = this.generateSummary(fullText);
        const capabilities = this.extractCapabilities(fullText);

        // ۴. ساخت شیء دانش
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

    // =============================================
    // روش درست خواندن PDF (همان روش آزمایش موفق)
    // =============================================
    async readPDF(filePath) {
        try {
            // ۱. دریافت فایل از سرور
            const response = await fetch(filePath);
            if (!response.ok) {
                console.warn(`فایل پیدا نشد: ${filePath}`);
                return null;
            }

            // ۲. تبدیل به ArrayBuffer
            const arrayBuffer = await response.arrayBuffer();

            // ۳. بررسی وجود pdfParse
            if (typeof pdfParse === 'undefined') {
                console.warn('pdfParse در دسترس نیست');
                return null;
            }

            // ۴. پردازش با pdfParse
            const pdf = await pdfParse(arrayBuffer);
            
            // ۵. استخراج متن
            let text = pdf.text || '';
            
            // ۶. اگر متن خالی بود، از روش جایگزین استفاده کن
            if (text.length < 10) {
                // گاهی pdfParse متن را در صفحات جداگانه می‌دهد
                if (pdf.pages && pdf.pages.length > 0) {
                    text = pdf.pages.map(p => p.text || '').join('\n');
                }
            }

            return text;
        } catch (error) {
            console.warn('خطا در خواندن PDF:', error);
            return null;
        }
    },

    // =============================================
    // استخراج خلاصه و قابلیت‌ها (بهبودیافته)
    // =============================================
    generateSummary(text) {
        if (!text || text.length < 20) return 'خلاصه در دسترس نیست';
        
        // حذف کاراکترهای اضافی
        const cleanText = text.replace(/\s+/g, ' ').trim();
        
        // پیدا کردن جملات کامل
        const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText];
        
        // انتخاب ۲-۳ جمله اول به عنوان خلاصه
        const summarySentences = sentences.slice(0, 3).map(s => s.trim());
        let summary = summarySentences.join(' ');
        
        // اگر خلاصه خیلی بلند بود، برش بزن
        if (summary.length > 300) {
            summary = summary.substring(0, 300) + '...';
        }
        
        return summary || 'خلاصه در دسترس نیست';
    },

    extractCapabilities(text) {
        if (!text || text.length < 10) return ['قابلیت ۱', 'قابلیت ۲', 'قابلیت ۳', 'قابلیت ۴', 'قابلیت ۵', 'قابلیت ۶', 'قابلیت ۷'];
        
        const cleanText = text.replace(/\s+/g, ' ').trim();
        
        // کلمات کلیدی برای جستجو
        const keywordList = [
            { word: "هوش مصنوعی", weight: 5 },
            { word: "مهندسی فرهنگی", weight: 4 },
            { word: "تحول", weight: 3 },
            { word: "عدالت دیجیتال", weight: 4 },
            { word: "دانش", weight: 3 },
            { word: "رادیو", weight: 3 },
            { word: "تلویزیون", weight: 3 },
            { word: "نظریه", weight: 4 },
            { word: "عمل‌گرا", weight: 4 },
            { word: "ارزش", weight: 3 },
            { word: "همراهان روشنایی", weight: 5 },
            { word: "مدیریت دانش", weight: 4 },
            { word: "سکوت حیرانی", weight: 4 },
            { word: "حکمرانی", weight: 3 },
            { word: "اخلاق", weight: 3 },
            { word: "فرهنگ", weight: 3 },
            { word: "تعامل", weight: 3 },
            { word: "ماشین", weight: 2 }
        ];

        // پیدا کردن کلمات کلیدی در متن
        const found = [];
        for (const item of keywordList) {
            if (cleanText.includes(item.word)) {
                found.push(item.word);
            }
        }

        // اگر چیزی پیدا نشد، از کلمات پرتکرار استفاده کن
        if (found.length === 0) {
            const words = cleanText.split(/[\s،,.;:]+/).filter(w => w.length > 3);
            const wordCount = {};
            for (const w of words) {
                wordCount[w] = (wordCount[w] || 0) + 1;
            }
            const sorted = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);
            for (const w of sorted.slice(0, 10)) {
                if (w.length > 3 && !found.includes(w)) {
                    found.push(w);
                }
                if (found.length >= 7) break;
            }
        }

        // تکمیل تا ۷ قابلیت
        while (found.length < 7) {
            found.push(`قابلیت ${found.length + 1}`);
        }

        return found.slice(0, 7);
    },

    // =============================================
    // ایجاد روابط بین مقالات (بهبودیافته)
    // =============================================
    buildRelations(memory) {
        const ids = Object.keys(memory.articles);
        let created = 0;
        const relationSet = new Set();

        for (let i = 0; i < ids.length; i++) {
            for (let j = i + 1; j < ids.length; j++) {
                const a = memory.articles[ids[i]];
                const b = memory.articles[ids[j]];
                if (a.id === b.id) continue;

                // بررسی برچسب‌های مشترک
                const common = [];
                if (a.keywords?.fa && b.keywords?.fa) {
                    for (const tag of a.keywords.fa) {
                        if (b.keywords.fa.some(t => t.toLowerCase() === tag.toLowerCase())) {
                            common.push(tag);
                        }
                    }
                }

                // بررسی کلمات مشترک در خلاصه
                if (common.length < 2 && a.summary?.fa && b.summary?.fa) {
                    const summaryWords = a.summary.fa.split(/[\s،,.;:]+/).filter(w => w.length > 3);
                    const bSummaryWords = b.summary.fa.split(/[\s،,.;:]+/).filter(w => w.length > 3);
                    for (const word of summaryWords) {
                        if (bSummaryWords.some(w => w.toLowerCase() === word.toLowerCase()) && !common.includes(word)) {
                            common.push(word);
                            if (common.length >= 3) break;
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

        // به‌روزرسانی مرحله مقالات
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
    }
};

// =============================================
// بهبود ArticleAgent برای استفاده از SmartProcessor
// =============================================
const originalScan = ArticleAgent.scan;
ArticleAgent.scan = async function(memory) {
    console.log("ArticleAgent started with SmartProcessor v2.0");

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
