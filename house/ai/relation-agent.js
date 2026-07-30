const RelationAgent = {
    name: "Relation Agent",
    version: "3.1",
    async scan(memory) {
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
        // بازسازی گراف
        if (typeof KnowledgeGraph !== 'undefined' && KnowledgeGraph.rebuild) {
            KnowledgeGraph.rebuild(memory);
        }
        return { scanned: ids.length, processed: created };
    }
};
