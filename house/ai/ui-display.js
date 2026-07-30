// ui-display.js - نمایش داده‌ها در صفحه ai.html
const UIDisplay = {
    version: "1.0",

    renderArticles(articles) {
        const container = document.getElementById('articles-container');
        if (!container) return;

        container.innerHTML = '';
        Object.values(articles).forEach(article => {
            const div = document.createElement('div');
            div.className = 'article-card';
            div.innerHTML = `
                <h3>${article.title.fa}</h3>
                <p><strong>خلاصه:</strong> ${article.summary.fa || 'ندارد'}</p>
                <p><strong>هفت قابلیت:</strong> ${(article.sevenCapabilities.fa || []).join('، ') || 'ندارد'}</p>
                <p><strong>مرحله:</strong> ${article.ai.state}</p>
                <p><strong>آخرین بروزرسانی:</strong> ${new Date(article.ai.lastUpdate).toLocaleDateString('fa-IR')}</p>
            `;
            container.appendChild(div);
        });
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

        const list = document.createElement('ul');
        relations.forEach(rel => {
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
        this.renderArticles(memory.articles || {});
        this.renderStatistics(memory.statistics || {});
        this.renderGraph(memory.relations || []);
    }
};
