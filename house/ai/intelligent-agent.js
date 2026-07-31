// intelligent-agent.js - عامل هوشمند مرکزی برای تعامل و پردازش
const IntelligentAgent = {
    version: "1.0",
    // تابع اصلی برای پردازش درخواست‌های مخاطب
    async processRequest(requestType, data, memory) {
        switch (requestType) {
            case 'purchase':
                return this.handlePurchase(data, memory);
            case 'comment':
                return this.handleComment(data, memory);
            case 'problem':
                return this.handleProblem(data, memory);
            default:
                return { status: 'error', message: 'درخواست نامعتبر' };
        }
    },

    // مدیریت درخواست خرید
    handlePurchase(data, memory) {
        // پیدا کردن مقاله یا کتاب درخواستی
        const item = memory.articles[data.articleId] || memory.books[data.articleId];
        if (!item) {
            return { status: 'error', message: 'محصول یافت نشد' };
        }
        // ثبت درخواست در localStorage
        const purchases = JSON.parse(localStorage.getItem('PURCHASE_REQUESTS') || '[]');
        purchases.push({
            itemId: data.articleId,
            itemTitle: item.title.fa,
            buyerName: data.name,
            address: data.address,
            postalCode: data.postalCode,
            quantity: data.quantity,
            date: new Date().toISOString()
        });
        localStorage.setItem('PURCHASE_REQUESTS', JSON.stringify(purchases));
        return { status: 'success', message: 'درخواست خرید شما ثبت شد. ادمین با شما تماس خواهد گرفت.' };
    },

    // مدیریت نظر هوشمند
    handleComment(data, memory) {
        // پیدا کردن مقاله مرتبط
        const article = memory.articles[data.articleId];
        if (!article) {
            return { status: 'error', message: 'مقاله یافت نشد' };
        }
        // تولید پاسخ هوشمند بر اساس محتوای مقاله
        const response = this.generateSmartResponse(data.comment, article);
        // ذخیره تعامل
        const interactions = JSON.parse(localStorage.getItem('SMART_INTERACTIONS') || '[]');
        interactions.push({
            articleId: data.articleId,
            comment: data.comment,
            response: response,
            date: new Date().toISOString()
        });
        localStorage.setItem('SMART_INTERACTIONS', JSON.stringify(interactions));
        return { status: 'success', message: response };
    },

    // تولید پاسخ هوشمند
    generateSmartResponse(comment, article) {
        // بررسی کلمات کلیدی در نظر
        const keywords = article.keywords.fa || [];
        let response = 'از نظر شما متشکرم. ';
        for (const keyword of keywords) {
            if (comment.includes(keyword)) {
                response += `بر اساس مقاله "${article.title.fa}"، موضوع "${keyword}" یکی از مفاهیم کلیدی است. `;
                return response;
            }
        }
        response += `این موضوع با مفاهیم "${keywords.slice(0, 3).join('، ')}" مرتبط است.`;
        return response;
    },

    // مدیریت حل مشکل
    handleProblem(data, memory) {
        // جستجو در گراف دانش
        const results = this.searchKnowledgeGraph(data.problem, memory);
        // ذخیره مشکل
        const issues = JSON.parse(localStorage.getItem('SOLVED_ISSUES') || '[]');
        issues.push({
            problem: data.problem,
            solution: results,
            date: new Date().toISOString()
        });
        localStorage.setItem('SOLVED_ISSUES', JSON.stringify(issues));
        return { status: 'success', message: results };
    },

    // جستجو در گراف دانش
    searchKnowledgeGraph(query, memory) {
        const results = [];
        // جستجو در مقالات
        for (const id in memory.articles) {
            const article = memory.articles[id];
            const text = `${article.title.fa} ${article.summary.fa}`;
            if (text.includes(query)) {
                results.push({ type: 'مقاله', title: article.title.fa, id: article.id });
            }
        }
        // جستجو در کتاب‌ها
        for (const id in memory.books) {
            const book = memory.books[id];
            const text = `${book.title.fa} ${book.summary.fa}`;
            if (text.includes(query)) {
                results.push({ type: 'کتاب', title: book.title.fa, id: book.id });
            }
        }
        // جستجو در منابع خارجی (اگر external-sources.json موجود باشد)
        try {
            const sources = JSON.parse(localStorage.getItem('EXTERNAL_SOURCES') || '[]');
            for (const source of sources) {
                if (source.type === 'library') {
                    results.push({ type: 'منبع خارجی', title: source.name, id: 'EXT-' + source.id });
                }
            }
        } catch (e) {
            console.warn('خطا در بارگذاری منابع خارجی:', e);
        }
        if (results.length === 0) {
            return 'هیچ نتیجه‌ای در گراف دانش یافت نشد.';
        }
        return results.map(r => `${r.type}: "${r.title}" (شناسه: ${r.id})`).join('\n');
    }
};
