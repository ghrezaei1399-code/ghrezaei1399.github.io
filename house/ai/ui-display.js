// ui-display.js - نمایش اشیاء دانش
class UIDisplay {
    constructor() {
        this.knowledgeBuilder = knowledgeBuilder;
        console.log('✅ UIDisplay initialized');
    }

    displayKnowledge() {
        const container = document.getElementById('knowledge-container');
        if (!container) {
            console.warn('⚠️ Knowledge container not found');
            return;
        }
        
        const stats = this.knowledgeBuilder.getStatistics();
        const allKnowledge = this.knowledgeBuilder.getAllKnowledge();
        
        if (allKnowledge.length === 0) {
            container.innerHTML = `
                <div class="knowledge-stats">
                    <h3>📊 آمار دانش</h3>
                    <p style="color: #a0aec0;">هیچ داده‌ای پردازش نشده است</p>
                </div>
                <p style="color: #718096; text-align: center; padding: 20px;">
                    لطفاً مقاله‌ها، کتاب‌ها و پوسترها را بارگذاری کنید
                </p>
            `;
            return;
        }
        
        const html = `
            <div class="knowledge-stats">
                <h3>📊 آمار دانش</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">${stats.totalObjects}</div>
                        <div>اشیاء دانش</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats.totalRelations}</div>
                        <div>روابط</div>
                    </div>
                    ${Object.entries(stats.objectsByType).map(([type, count]) => `
                        <div class="stat-item">
                            <div class="stat-number">${count}</div>
                            <div>${this.getTypeLabel(type)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="knowledge-items">
                ${allKnowledge.map(k => this.renderKnowledgeItem(k)).join('')}
            </div>
        `;
        
        container.innerHTML = html;
        console.log('✅ Knowledge displayed successfully');
    }

    getTypeLabel(type) {
        const labels = {
            'article': 'مقالات',
            'book': 'کتاب‌ها',
            'poster': 'پوسترها'
        };
        return labels[type] || type;
    }

    renderKnowledgeItem(knowledge) {
        const hasRelations = knowledge.relations && knowledge.relations.length > 0;
        
        return `
            <div class="knowledge-item" data-id="${knowledge.id}">
                <h4>${knowledge.title}</h4>
                <div class="meta">
                    <span>📌 نوع: ${this.getTypeLabel(knowledge.type)}</span>
                    <span>✍️ نویسنده: ${knowledge.author}</span>
                    <span>📅 سال: ${knowledge.year}</span>
                    ${knowledge.metadata && knowledge.metadata.wordCount ? 
                        `<span>📊 کلمات: ${knowledge.metadata.wordCount}</span>` : ''}
                </div>
                <div class="summary">
                    <strong>خلاصه:</strong>
                    <p>${knowledge.summary}</p>
                </div>
                ${knowledge.capabilities && knowledge.capabilities.length > 0 ? `
                    <div class="capabilities">
                        <strong>قابلیت‌ها:</strong>
                        <ul>
                            ${knowledge.capabilities.map(cap => `<li>${cap}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${hasRelations ? `
                    <div class="relations">
                        <strong>روابط (${knowledge.relations.length}):</strong>
                        <ul>
                            ${knowledge.relations.map(rel => 
                                `<li>🔗 ${rel.type} (امتیاز: ${rel.score}) - ${rel.reasons.join(', ')}</li>`
                            ).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }

    updateDisplay() {
        this.displayKnowledge();
    }
}

// ایجاد نمونه جهانی
const uiDisplay = new UIDisplay();
console.log('✅ UIDisplay module loaded');
