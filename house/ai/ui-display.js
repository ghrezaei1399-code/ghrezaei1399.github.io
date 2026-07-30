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
        const name = prompt('نام و نام خانوادگی خود را وارد کنید:');
        if (!name) return;
        const address = prompt('آدرس کامل (شهر، خیابان، پلاک) را وارد کنید:');
        if (!address) return;
        const postalCode = prompt('کد پستی را وارد کنید:');
        if (!postalCode) return;
        const quantity = prompt('تعداد مورد نظر را وارد کنید:', '1');
        if (!quantity) return;
        const priceDigital = prompt('قیمت هر نسخه الکترونیکی (تومان) را وارد کنید:', '0');
        const pricePhysical = prompt('قیمت هر نسخه فیزیکی (تومان) را وارد کنید:', '0');
        const purchaseData = {
            articleId,
            name,
            address,
            postalCode,
            quantity,
            priceDigital,
            pricePhysical,
            date: new Date().toISOString()
        };
        const purchases = JSON.parse(localStorage.getItem('PURCHASE_REQUESTS') || '[]');
        purchases.push(purchaseData);
        localStorage.setItem('PURCHASE_REQUESTS', JSON.stringify(purchases));
        alert('✅ درخواست خرید شما ثبت شد. ادمین با شما تماس خواهد گرفت.');
    },
    smartComment(articleId) {
        const comment = prompt(`نظر خود را درباره مقاله/کتاب با شناسه ${articleId} بنویسید:`);
        if (!comment) return;
        const response = `🤖 پاسخ هوشمند: از نظر شما متشکریم. این موضوع با مفاهیم "هوش مصنوعی انسان‌محور" و "مهندسی فرهنگی" مرتبط است.`;
        alert(`💬 نظر شما ثبت شد.\n\n${response}`);
        const interactions = JSON.parse(localStorage.getItem('SMART_INTERACTIONS') || '[]');
        interactions.push({ articleId, comment, response, date: new Date().toISOString() });
        localStorage.setItem('SMART_INTERACTIONS', JSON.stringify(interactions));
    },
    solveProblem(articleId) {
        const problem = prompt(`مشکل خود را درباره مقاله/کتاب با شناسه ${articleId} شرح دهید:`);
        if (!problem) return;
        const solution = `🔍 راه‌حل پیشنهادی: مشکل شما ممکن است با مطالعه "طرح درهمتنیدگی انسان و هوش مصنوعی" (شناسه: ART-001) یا کتاب "آوای دل" (شناسه: BK-002) مرتبط باشد. به بخش "مقالات" یا "کتاب‌ها" در سایت اصلی مراجعه کنید.`;
        alert(`🔧 راه‌حل مشکل:\n\n${solution}`);
        const issues = JSON.parse(localStorage.getItem('SOLVED_ISSUES') || '[]');
        issues.push({ articleId, problem, solution, date: new Date().toISOString() });
        localStorage.setItem('SOLVED_ISSUES', JSON.stringify(issues));
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
