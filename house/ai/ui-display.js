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
                <h3>📄 ${article.title.fa}</h3>
                <p><strong>خلاصه:</strong> ${article.summary.fa || 'ندارد'}</p>
                <p><strong>هفت قابلیت:</strong> ${(article.sevenCapabilities.fa || []).join('، ') || 'ندارد'}</p>
                <p><strong>مرحله:</strong> ${article.ai.state}</p>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="UIDisplay.requestPurchase('article', '${article.id}')">📩 درخواست خرید</button>
                    <button class="btn" onclick="UIDisplay.submitComment('article', '${article.id}')">💬 نظر</button>
                </div>
                <hr>
            `;
            container.appendChild(div);
        }
    },

    renderBooks(books) {
        const container = document.getElementById('books-container');
        if (!container) return;
        container.innerHTML = '';
        for (const id in books) {
            const book = books[id];
            const div = document.createElement('div');
            div.className = 'item-card book-card';
            div.innerHTML = `
                <h3>📚 ${book.title}</h3>
                <p><strong>نویسنده:</strong> ${book.author || 'نامشخص'}</p>
                <p><strong>ناشر:</strong> ${book.publisher || 'نامشخص'}</p>
                <p><strong>سال انتشار:</strong> ${book.year || 'نامشخص'}</p>
                <p><strong>خلاصه:</strong> ${book.summary || 'ندارد'}</p>
                <p><strong>قیمت:</strong> ${book.price || 'تماس بگیرید'}</p>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="UIDisplay.requestPurchase('book', '${id}')">📩 درخواست خرید</button>
                    <button class="btn" onclick="UIDisplay.submitComment('book', '${id}')">💬 نظر</button>
                </div>
                <hr>
            `;
            container.appendChild(div);
        }
    },

    renderPosters(posters) {
        const container = document.getElementById('posters-container');
        if (!container) return;
        container.innerHTML = '';
        for (const id in posters) {
            const poster = posters[id];
            const div = document.createElement('div');
            div.className = 'item-card poster-card';
            div.innerHTML = `
                <h3>🖼️ ${poster.title}</h3>
                <p><strong>توضیحات:</strong> ${poster.description || 'ندارد'}</p>
                <p><strong>تاریخ:</strong> ${poster.date || 'نامشخص'}</p>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="UIDisplay.requestPurchase('poster', '${id}')">📩 درخواست خرید</button>
                    <button class="btn" onclick="UIDisplay.submitComment('poster', '${id}')">💬 نظر</button>
                </div>
                <hr>
            `;
            container.appendChild(div);
        }
    },

    requestPurchase(type, id) {
        const name = prompt('نام و نام خانوادگی:');
        if (!name) return;
        const address = prompt('آدرس کامل:');
        if (!address) return;
        const phone = prompt('شماره تماس:');
        if (!phone) return;
        const quantity = prompt('تعداد:', '1');
        if (!quantity) return;
        const data = { type, id, name, address, phone, quantity, date: new Date().toISOString() };
        const key = `${type.toUpperCase()}_PURCHASES`;
        const purchases = JSON.parse(localStorage.getItem(key) || '[]');
        purchases.push(data);
        localStorage.setItem(key, JSON.stringify(purchases));
        alert('✅ درخواست شما ثبت شد. ادمین با شما تماس خواهد گرفت.');
    },

    submitComment(type, id) {
        const comment = prompt('نظر خود را بنویسید:');
        if (!comment) return;
        const data = { type, id, comment, date: new Date().toISOString() };
        const key = `${type.toUpperCase()}_COMMENTS`;
        const comments = JSON.parse(localStorage.getItem(key) || '[]');
        comments.push(data);
        localStorage.setItem(key, JSON.stringify(comments));
        alert('✅ نظر شما ثبت شد.');
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
        this.renderBooks(memory.books || {});
        this.renderPosters(memory.posters || {});
        this.renderStatistics(memory.statistics || {});
        this.renderGraph(memory.relations || []);
    }
};
