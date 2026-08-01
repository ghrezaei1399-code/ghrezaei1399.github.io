// intelligent-agent.js - عامل هوشمند برای تعامل با مخاطب
class IntelligentAgent {
    constructor() {
        this.knowledgeBuilder = knowledgeBuilder;
        this.userRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');
        console.log('✅ IntelligentAgent initialized');
    }

    // پاسخ به درخواست‌های کاربر
    handleRequest(request) {
        const responses = {
            'help': '💡 راهنمای سیستم:\n- برای پخش رادیو از بخش رادیو استفاده کنید\n- برای پخش ویدیو از بخش تلویزیون استفاده کنید\n- مقالات، کتاب‌ها و پوسترها در بخش دانش نمایش داده می‌شوند',
            'articles': `📚 تعداد مقالات: ${this.getArticleCount()}\n${this.getArticleList()}`,
            'books': `📖 تعداد کتاب‌ها: ${this.getBookCount()}\n${this.getBookList()}`,
            'posters': `🎨 تعداد پوسترها: ${this.getPosterCount()}\n${this.getPosterList()}`,
            'stats': this.getStatistics(),
            'relations': this.getRelationsInfo(),
        };

        const normalizedRequest = request.toLowerCase().trim();
        for (const [key, response] of Object.entries(responses)) {
            if (normalizedRequest.includes(key)) {
                return response;
            }
        }

        return this.getSmartResponse(request);
    }

    getArticleCount() {
        return this.knowledgeBuilder.knowledgeObjects.filter(k => k.type === 'article').length;
    }

    getBookCount() {
        return this.knowledgeBuilder.knowledgeObjects.filter(k => k.type === 'book').length;
    }

    getPosterCount() {
        return this.knowledgeBuilder.knowledgeObjects.filter(k => k.type === 'poster').length;
    }

    getArticleList() {
        const articles = this.knowledgeBuilder.knowledgeObjects.filter(k => k.type === 'article');
        return articles.map(a => `- ${a.title} (${a.author})`).join('\n') || 'هیچ مقاله‌ای یافت نشد';
    }

    getBookList() {
        const books = this.knowledgeBuilder.knowledgeObjects.filter(k => k.type === 'book');
        return books.map(b => `- ${b.title} (${b.author})`).join('\n') || 'هیچ کتابی یافت نشد';
    }

    getPosterList() {
        const posters = this.knowledgeBuilder.knowledgeObjects.filter(k => k.type === 'poster');
        return posters.map(p => `- ${p.title} (${p.author})`).join('\n') || 'هیچ پوستری یافت نشد';
    }

    getStatistics() {
        const stats = this.knowledgeBuilder.getStatistics();
        return `📊 آمار سیستم:\n- کل اشیاء دانش: ${stats.totalObjects}\n- کل روابط: ${stats.totalRelations}\n- مقالات: ${stats.objectsByType.article || 0}\n- کتاب‌ها: ${stats.objectsByType.book || 0}\n- پوسترها: ${stats.objectsByType.poster || 0}`;
    }

    getRelationsInfo() {
        const relations = this.knowledgeBuilder.getRelations();
        if (relations.length === 0) {
            return '🔗 هیچ رابطه‌ای یافت نشد';
        }
        return `🔗 تعداد روابط: ${relations.length}\n${relations.slice(0, 5).map(r => 
            `- ${r.type} (امتیاز: ${r.score})`
        ).join('\n')}`;
    }

    getSmartResponse(request) {
        const keywords = ['سلام', 'خوبی', 'چطوری', 'هی'];
        if (keywords.some(k => request.includes(k))) {
            return '👋 سلام! خوش آمدید به آزمایشگاه هوشمند دکتر رضائی. چطور می‌توانم کمک کنم؟';
        }

        if (request.includes('خرید') || request.includes('قیمت')) {
            return '🛒 برای خرید محصولات، لطفاً روی دکمه "درخواست خرید" در هر آیتم کلیک کنید.';
        }

        if (request.includes('دانلود')) {
            return '📥 برای دانلود فایل‌ها، روی دکمه "دانلود" در هر آیتم کلیک کنید.';
        }

        return `🤔 متوجه سوال شما نشدم. لطفاً یکی از این کلمات کلیدی را استفاده کنید:\n${Object.keys({
            help: 'راهنما',
            articles: 'مقالات',
            books: 'کتاب‌ها',
            posters: 'پوسترها',
            stats: 'آمار',
            relations: 'روابط'
        }).join(', ')}`;
    }

    // ثبت درخواست کاربر
    logRequest(request) {
        this.userRequests.push({
            request: request,
            timestamp: new Date().toISOString(),
            response: this.handleRequest(request)
        });
        localStorage.setItem('userRequests', JSON.stringify(this.userRequests));
    }

    // دریافت تاریخچه درخواست‌ها
    getRequestHistory() {
        return this.userRequests;
    }

    // دریافت پیشنهادات هوشمند
    getSuggestions() {
        const suggestions = [
            '📚 برای دیدن مقالات، "مقالات" را تایپ کنید',
            '📖 برای دیدن کتاب‌ها، "کتاب‌ها" را تایپ کنید',
            '🎨 برای دیدن پوسترها، "پوسترها" را تایپ کنید',
            '📊 برای دیدن آمار، "آمار" را تایپ کنید',
            '🔗 برای دیدن روابط، "روابط" را تایپ کنید',
            '💡 برای راهنما، "help" یا "راهنما" را تایپ کنید'
        ];
        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
}

// ایجاد نمونه جهانی
const intelligentAgent = new IntelligentAgent();
console.log('✅ IntelligentAgent module loaded');

// تابع global برای استفاده در HTML
window.intelligentAgent = intelligentAgent;
