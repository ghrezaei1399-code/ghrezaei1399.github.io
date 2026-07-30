const UIDisplay = {
    version: "2.0",
    renderArticles(articles) {
        const container = document.getElementById('articles-container');
        if (!container) return;
        container.innerHTML = '';
        // حذف تکرار بر اساس id
        const uniqueArticles = {};
        for (const id in articles) {
            if (!uniqueArticles[articles[id].id]) {
                uniqueArticles[articles[id].id] = articles[id];
            }
        }
        for (const id in uniqueArticles) {
            const article = uniqueArticles[id];
            const div = document.createElement('div');
            div.className = 'article-card';
            div.innerHTML = `
                <h3>${article.title.fa}</h3>
                <p><strong>خلاصه:</strong> ${article.summary.fa || 'ندارد'}</p>
                <p><strong>هفت قابلیت:</strong> ${(article.sevenCapabilities.fa || []).join('، ') || 'ندارد'}</p>
                <p><strong>مرحله:</strong> ${article.ai.state}</p>
                <div>
                    <button onclick="alert('درخواست مقاله کامل: ${article.id}')">درخواست مقاله کامل</button>
                    <button onclick="alert('نظر خود را وارد کنید')">نظر دادن</button>
                    <button onclick="alert('لینک کپی شد')">اشتراک‌گذاری</button>
                </div>
                <hr>
            `;
            container.appendChild(div);
        }
    },
    renderStatistics(statistics) {
        const container = document.getElementById('statistics-container');
        if (!container) return;
        container.innerHTML = `
            <p>کل مقالات: ${statistics.totalArticles || 0}</p>
            <p>مقالات پردازش‌شده: ${statistics.processedArticles || 0}</p>
            <p>گره‌های دانش: ${statistics.knowledgeNodes || 0}</p>
            <p>یال‌های دانش: ${statistics.knowledgeEdges || 0}</p>
        `;
    },
    renderGraph(relations) {
        const container = document.getElementById('graph-container');
        if (!container) return;
        container.innerHTML = '';
        if (!relations || relations.length === 0) {
            container.innerHTML = '<p>هیچ رابطه‌ای ثبت نشده است.</p>';
            return;
        }
        // حذف روابط تکراری
        const uniqueRelations = [];
        const seen = new Set();
        for (const rel of relations) {
            const key = `${rel.from}|${rel.to}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueRelations.push(rel);
            }
        }
        const list = document.createElement('ul');
        uniqueRelations.forEach(rel => {
            const li = document.createElement('li');
            li.textContent = `${rel.from} → ${rel.to} (${rel.type}) - ${new Date(rel.created).toLocaleDateString('fa-IR')}`;
            list.appendChild(li);
        });
        container.appendChild(list);
    },
    renderAll(memory) {
        if (!memory) {
            console.warn('حافظه خالی است');
            return;
        }
        // به‌روزرسانی مرحله قبل از نمایش
        if (KnowledgeBuilder.updateState) {
            KnowledgeBuilder.updateState(memory);
        }
        this.renderArticles(memory.articles || {});
        this.renderStatistics(memory.statistics || {});
        this.renderGraph(memory.relations || []);
    }
};
