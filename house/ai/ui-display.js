const UIDisplay = {
    version: "3.0",
    renderArticles(articles) {
        const container = document.getElementById('articles-container');
        if (!container) return;
        container.innerHTML = '';
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
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="UIDisplay.requestPurchase('${article.id}')">📩 درخواست خرید</button>
                    <button class="btn" onclick="UIDisplay.smartComment('${article.id}')">💬 نظر هوشمند</button>
                    <button class="btn" onclick="UIDisplay.solveProblem('${article.id}')">🔧 حل مشکل</button>
                </div>
                <hr>
            `;
            container.appendChild(div);
        }
    },

    requestPurchase(articleId) {
        const name = prompt('نام و نام خانوادگی:');
        if (!name) return;
        const address = prompt('آدرس کامل:');
        if (!address) return;
        const postalCode = prompt('کد پستی:');
        if (!postalCode) return;
        const quantity = prompt('تعداد:', '1');
        if (!quantity) return;
        const data = { articleId, name, address, postalCode, quantity };
        IntelligentAgent.processRequest('purchase', data, window.memory).then(result => alert(result.message));
    },

    smartComment(articleId) {
        const comment = prompt('نظر خود را بنویسید:');
        if (!comment) return;
        const data = { articleId, comment };
        IntelligentAgent.processRequest('comment', data, window.memory).then(result => alert(result.message));
    },

    solveProblem(articleId) {
        const problem = prompt('مشکل خود را شرح دهید:');
        if (!problem) return;
        const data = { articleId, problem };
        IntelligentAgent.processRequest('problem', data, window.memory).then(result => alert(result.message));
    },

    renderStatistics(statistics) {
        const container = document.getElementById('statistics-container');
        if (!container) return;
        container.innerHTML = `
            <div class="stat-grid">
                <div class="stat-item"><span class="number">${statistics.totalArticles || 0}</span><span class="label">کل مقالات</span></div>
                <div class="stat-item"><span class="number">${statistics.processedArticles || 0}</span><span class="label">مقالات پردازش‌شده</span></div>
                <div class="stat-item"><span class="number">${statistics.knowledgeNodes || 0}</span><span class="label">گره‌های دانش</span></div>
                <div class="stat-item"><span class="number">${statistics.knowledgeEdges || 0}</span><span class="label">یال‌های دانش</span></div>
            </div>
        `;
    },

    renderGraph(relations) {
        const container = document.getElementById('graph-container');
        if (!container) return;
        container.innerHTML = '';
        if (!relations || relations.length === 0) {
            container.innerHTML = '<p>🔹 هیچ رابطه‌ای ثبت نشده است.</p>';
            return;
        }
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
            li.textContent = `${rel.from} → ${rel.to} (${rel.type})`;
            list.appendChild(li);
        });
        container.appendChild(list);
    },

    renderAll(memory) {
        if (!memory) {
            console.warn('حافظه خالی است');
            return;
        }
        if (KnowledgeBuilder.updateState) {
            KnowledgeBuilder.updateState(memory);
        }
        this.renderArticles(memory.articles || {});
        this.renderStatistics(memory.statistics || {});
        this.renderGraph(memory.relations || []);
    }
};
