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

    // در توابع requestPurchase, smartComment, solveProblem جایگزین کنید:
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
    const result = await IntelligentAgent.processRequest('purchase', data, window.memory);
    alert(result.message);
},

smartComment(articleId) {
    const comment = prompt('نظر خود را بنویسید:');
    if (!comment) return;
    const data = { articleId, comment };
    const result = await IntelligentAgent.processRequest('comment', data, window.memory);
    alert(result.message);
},

solveProblem(articleId) {
    const problem = prompt('مشکل خود را شرح دهید:');
    if (!problem) return;
    const data = { articleId, problem };
    const result = await IntelligentAgent.processRequest('problem', data, window.memory);
    alert(result.message);
}
    // توابع تعامل با رادیو/تلویزیون
    sendTextInteraction() {
        const message = prompt('پیام خود را بنویسید:');
        if (!message) return;
        const interaction = {
            type: 'text',
            message: message,
            time: new Date().toISOString(),
            source: 'radio-tv'
        };
        this.saveInteraction(interaction);
        const response = this.getSmartResponse(message);
        alert(`🤖 پاسخ هوشمند:\n${response}`);
    },

    startVoiceRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                alert('🎤 ضبط ویس شروع شد. (برای پایان ضبط، این پیام را ببندید.)');
                const interaction = {
                    type: 'voice',
                    message: 'پیام صوتی دریافت شد.',
                    time: new Date().toISOString(),
                    source: 'radio-tv'
                };
                this.saveInteraction(interaction);
                alert('✅ پیام صوتی شما دریافت شد. به زودی بررسی می‌شود.');
            })
            .catch(err => alert('❌ دسترسی به میکروفون امکان‌پذیر نیست.'));
    },

    startVideoRecording() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                alert('📹 ضبط ویدیو شروع شد. (برای پایان ضبط، این پیام را ببندید.)');
                const interaction = {
                    type: 'video',
                    message: 'پیام ویدیویی دریافت شد.',
                    time: new Date().toISOString(),
                    source: 'radio-tv'
                };
                this.saveInteraction(interaction);
                alert('✅ پیام ویدیویی شما دریافت شد. به زودی بررسی می‌شود.');
            })
            .catch(err => alert('❌ دسترسی به دوربین امکان‌پذیر نیست.'));
    },

    saveInteraction(interaction) {
        const interactions = JSON.parse(localStorage.getItem('RADIO_TV_INTERACTIONS') || '[]');
        interactions.push(interaction);
        localStorage.setItem('RADIO_TV_INTERACTIONS', JSON.stringify(interactions));
    },

    getSmartResponse(message) {
        if (message.includes('هوش مصنوعی')) {
            return 'بر اساس نظریه "درهمتنیدگی انسان و هوش مصنوعی"، تعامل انسان و ماشین یک فرصت برای تکامل فرهنگی است.';
        } else if (message.includes('عدالت')) {
            return 'عدالت دیجیتال یکی از اهداف اصلی این پلتفرم است. لطفاً مقالات "عدالت دیجیتال" را مطالعه کنید.';
        } else {
            return 'از پیام شما متشکرم. این موضوع در گراف دانش ما در حال بررسی است. به زودی پاسخ کامل‌تری ارائه می‌شود.';
        }
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

// مدیریت پخش خودکار و چرخش محتوا
const PlayerManager = {
    startAutoPlay() {
        const player = document.getElementById('mainPlayer');
        if (player) {
            player.src = "sample-video.mp4";
            player.play().catch(e => console.log('پخش خودکار نیاز به تعامل کاربر دارد.'));
        }
        this.startRotation();
    },

    startRotation() {
        const container = document.getElementById('rotationContent');
        if (!container) return;
        const items = [
            { title: 'مقاله: هوشمندسازی همراهان روشنایی', desc: 'چارچوبی برای مهندسی فرهنگی' },
            { title: 'کتاب: آوای دل', desc: 'مجموعه اشعار عاشقانه' },
            { title: 'پوستر: همایش بیداری دیجیتال', desc: 'فراخوان همکاری جهانی' }
        ];
        let index = 0;
        setInterval(() => {
            const item = items[index % items.length];
            container.innerHTML = `
                <div style="background:white; padding:15px; border-radius:12px; border-right:4px solid #f7c948;">
                    <strong>${item.title}</strong>
                    <p style="margin:5px 0 0; color:#3a5e77;">${item.desc}</p>
                </div>
            `;
            document.getElementById('nowPlayingTitle').textContent = item.title;
            document.getElementById('nowPlayingDesc').textContent = item.desc;
            index++;
        }, 8000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    PlayerManager.startAutoPlay();
});
