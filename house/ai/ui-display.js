// ui-display.js - نسخه نهایی و پایدار
const UIDisplay = {
    version: "3.2",
    
    renderArticles(articles) {
        const container = document.getElementById('articles-container');
        if (!container) return;
        container.innerHTML = '';
        
        // حذف مقالات تکراری
        const uniqueArticles = {};
        for (const id in articles) {
            const article = articles[id];
            if (!uniqueArticles[article.id]) {
                uniqueArticles[article.id] = article;
            }
        }

        for (const id in uniqueArticles) {
            const article = uniqueArticles[id];
            const div = document.createElement('div');
            div.className = 'article-card';
            
            // استخراج اطلاعات با مدیریت خطا
            const title = article.title?.fa || article.title || 'بدون عنوان';
            const author = article.author || 'نامشخص';
            const year = article.year || 'نامشخص';
            const summary = article.summary?.fa || article.summary || 'خلاصه در دسترس نیست';
            const keywords = article.keywords?.fa || article.keywords || [];
            const keywordsText = Array.isArray(keywords) ? keywords.join('، ') : 'ندارد';
            
            div.innerHTML = `
                <h3>📄 ${title}</h3>
                <p><strong>نویسنده:</strong> ${author}</p>
                <p><strong>سال:</strong> ${year}</p>
                <p><strong>خلاصه:</strong> ${summary}</p>
                <p><strong>کلیدواژه‌ها:</strong> ${keywordsText}</p>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="UIDisplay.requestPurchase('article', '${article.id}')">📩 درخواست خرید</button>
                    <button class="btn" onclick="UIDisplay.submitComment('article', '${article.id}')">💬 نظر</button>
                </div>
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
                <h3>📚 ${book.title || 'بدون عنوان'}</h3>
                <p><strong>نویسنده:</strong> ${book.author || 'نامشخص'}</p>
                <p><strong>ناشر:</strong> ${book.publisher || 'نامشخص'}</p>
                <p><strong>سال انتشار:</strong> ${book.year || 'نامشخص'}</p>
                <p><strong>خلاصه:</strong> ${book.description || book.summary || 'ندارد'}</p>
                <p><strong>قیمت:</strong> ${book.price || 'تماس بگیرید'}</p>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="UIDisplay.requestPurchase('book', '${id}')">📩 درخواست خرید</button>
                    <button class="btn" onclick="UIDisplay.submitComment('book', '${id}')">💬 نظر</button>
                </div>
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
                <h3>🖼️ ${poster.title || 'بدون عنوان'}</h3>
                <p><strong>نویسنده:</strong> ${poster.author || 'نامشخص'}</p>
                <p><strong>سال:</strong> ${poster.year || 'نامشخص'}</p>
                <p><strong>رویداد:</strong> ${poster.event || 'نامشخص'}</p>
                <p><strong>توضیحات:</strong> ${poster.description || 'ندارد'}</p>
                <p><strong>قیمت:</strong> ${poster.price || 'تماس بگیرید'}</p>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="UIDisplay.requestPurchase('poster', '${id}')">📩 درخواست خرید</button>
                    <button class="btn" onclick="UIDisplay.submitComment('poster', '${id}')">💬 نظر</button>
                </div>
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
                <div class="stat-item"><span class="number">${statistics.totalBooks || 0}</span><span class="label">کل کتاب‌ها</span></div>
                <div class="stat-item"><span class="number">${statistics.totalPosters || 0}</span><span class="label">کل پوسترها</span></div>
                <div class="stat-item"><span class="number">${statistics.knowledgeNodes || 0}</span><span class="label">گره‌های دانش</span></div>
            </div>
        `;
    },

    renderGraph(relations) {
        const container = document.getElementById('graph-container');
        if (!container) return;
        container.innerHTML = '';
        
        if (!relations || relations.length === 0) {
            container.innerHTML = '<p style="color:#1a6a8a; font-weight:400;">🔹 منتظر ارتباطات موثر با شما هستیم.</p>';
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
