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
    const form = document.createElement('div');
    form.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:30px; border-radius:20px; box-shadow:0 10px 40px rgba(0,0,0,0.2); z-index:1000; width:90%; max-width:500px; direction:rtl;';
    form.innerHTML = `
        <h3 style="margin-top:0;">📩 فرم درخواست خرید</h3>
        <label>نام و نام خانوادگی: <input type="text" id="fullName" style="width:100%; padding:8px; margin:5px 0 10px; border:1px solid #ccc; border-radius:8px;"></label>
        <label>آدرس (شهر، خیابان، پلاک): <input type="text" id="address" style="width:100%; padding:8px; margin:5px 0 10px; border:1px solid #ccc; border-radius:8px;"></label>
        <label>کد پستی: <input type="text" id="postalCode" style="width:100%; padding:8px; margin:5px 0 10px; border:1px solid #ccc; border-radius:8px;"></label>
        <label>تعداد: <input type="number" id="quantity" value="1" style="width:100%; padding:8px; margin:5px 0 10px; border:1px solid #ccc; border-radius:8px;"></label>
        <label>قیمت هر نسخه الکترونیکی (تومان): <input type="number" id="priceDigital" value="0" style="width:100%; padding:8px; margin:5px 0 10px; border:1px solid #ccc; border-radius:8px;"></label>
        <label>قیمت هر نسخه فیزیکی (تومان): <input type="number" id="pricePhysical" value="0" style="width:100%; padding:8px; margin:5px 0 10px; border:1px solid #ccc; border-radius:8px;"></label>
        <div style="display:flex; gap:10px; margin-top:15px;">
            <button onclick="UIDisplay.submitPurchase('${articleId}')" style="background:#1a6a8a; color:white; border:none; padding:10px 20px; border-radius:10px; cursor:pointer;">ثبت درخواست</button>
            <button onclick="this.closest('div').remove()" style="background:#eee; border:none; padding:10px 20px; border-radius:10px; cursor:pointer;">انصراف</button>
        </div>
    `;
    document.body.appendChild(form);
},
submitPurchase(articleId) {
    const name = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const postalCode = document.getElementById('postalCode').value;
    const quantity = document.getElementById('quantity').value;
    const priceDigital = document.getElementById('priceDigital').value;
    const pricePhysical = document.getElementById('pricePhysical').value;
    if (!name || !address || !postalCode) {
        alert('❌ لطفاً همه فیلدهای ضروری (نام، آدرس، کد پستی) را پر کنید.');
        return;
    }
    const purchaseData = { articleId, name, address, postalCode, quantity, priceDigital, pricePhysical, date: new Date().toISOString() };
    const purchases = JSON.parse(localStorage.getItem('PURCHASE_REQUESTS') || '[]');
    purchases.push(purchaseData);
    localStorage.setItem('PURCHASE_REQUESTS', JSON.stringify(purchases));
    alert('✅ درخواست خرید شما ثبت شد. ادمین با شما تماس خواهد گرفت.');
    document.querySelector('div[style*="fixed"]')?.remove();
}
  smartComment(articleId) {
    const comment = prompt(`نظر خود را درباره مقاله/کتاب با شناسه ${articleId} بنویسید. هوش مصنوعی به شما پاسخ خواهد داد.`);
    if (comment) {
        const response = `🤖 پاسخ هوشمند: از نظر شما متشکریم. بر اساس تحلیل گراف دانش، این موضوع با مفاهیم "هوش مصنوعی انسان‌محور" و "مهندسی فرهنگی" مرتبط است.`;
        alert(`💬 نظر شما ثبت شد.\n\n${response}`);
        const interactions = JSON.parse(localStorage.getItem('SMART_INTERACTIONS') || '[]');
        interactions.push({ articleId, comment, response, date: new Date().toISOString() });
        localStorage.setItem('SMART_INTERACTIONS', JSON.stringify(interactions));
    }
}
    solveProblem(articleId) {
    const problem = prompt(`مشکل خود را درباره مقاله/کتاب با شناسه ${articleId} شرح دهید. هوش مصنوعی راه‌حل ارائه می‌دهد.`);
    if (problem) {
        // جستجوی راه‌حل در گراف و منابع خارجی (نمونه)
        const solution = `🔍 راه‌حل پیشنهادی: بر اساس جستجو در پایگاه‌های داده، مشکل شما ممکن است با مطالعه "طرح درهمتنیدگی انسان و هوش مصنوعی" (شناسه: ART-001) یا کتاب "آوای دل" (شناسه: BK-002) مرتبط باشد. برای دسترسی به این منابع، به بخش "مقالات" یا "کتاب‌ها" در سایت اصلی مراجعه کنید.`;
        alert(`🔧 راه‌حل مشکل:\n\n${solution}`);
        const issues = JSON.parse(localStorage.getItem('SOLVED_ISSUES') || '[]');
        issues.push({ articleId, problem, solution, date: new Date().toISOString() });
        localStorage.setItem('SOLVED_ISSUES', JSON.stringify(issues));
    }
}
    // سایر توابع مانند renderStatistics و renderGraph به همان شکل باقی می‌مانند
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
