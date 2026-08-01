const KnowledgeBuilder = {
    version: "2.3",
    async build(article, extracted) {
        return {
            id: article.id,
            title: article.title,
            author: article.author || 'نامشخص',
            year: article.year || 'نامشخص',
            summary: { fa: extracted.summary.fa || 'خلاصه در دسترس نیست', en: "" },
            keywords: { fa: extracted.sevenCapabilities.fa || [], en: [] },
            publisher: article.publisher || 'نامشخص',
            description: article.description || article.summary || 'توضیح در دسترس نیست',
            price: article.price || 'تماس بگیرید',
            event: article.event || 'نامشخص',
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
        for (const type of ['articles', 'books', 'posters']) {
            const items = memory[type] || {};
            for (const id in items) {
                const item = items[id];
                const relations = item.relations || {};
                let hasRelation = false;
                let relationTypes = [];
                for (const relType of ['articles', 'books', 'posters']) {
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
