// knowledge-builder.js - نسخه نهایی و پایدار
const KnowledgeBuilder = {
    version: "2.4",
    
    build(article, extracted) {
        // مدیریت داده‌های ورودی با ساختارهای مختلف
        const title = article.title || article.title?.fa || 'بدون عنوان';
        const author = article.author || 'نامشخص';
        const year = article.year || 'نامشخص';
        const publisher = article.publisher || 'نامشخص';
        const description = article.description || article.summary || 'توضیح در دسترس نیست';
        const price = article.price || 'تماس بگیرید';
        const event = article.event || 'نامشخص';
        const keywords = article.keywords || article.tags || [];
        const keywordsArray = Array.isArray(keywords) ? keywords : [];
        
        return {
            id: article.id,
            type: article.type || 'article',
            title: title,
            author: author,
            year: year,
            publisher: publisher,
            description: description,
            price: price,
            event: event,
            summary: { fa: description, en: "" },
            keywords: { fa: keywordsArray, en: [] },
            source: article.file || article.path || '',
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
    
    updateState(memory) {
        // به‌روزرسانی مرحله بر اساس روابط
        const types = ['articles', 'books', 'posters'];
        for (const type of types) {
            const items = memory[type] || {};
            for (const id in items) {
                const item = items[id];
                const relations = item.relations || {};
                let hasRelation = false;
                let relationTypes = [];
                
                for (const relType of types) {
                    if (relations[relType] && relations[relType].length > 0) {
                        hasRelation = true;
                        relationTypes.push(relType);
                    }
                }
                
                item.ai.state = hasRelation ? `پیوند با ${relationTypes.join('، ')}` : "اولیه";
                item.ai.lastUpdate = new Date().toISOString();
            }
        }
    }
};
