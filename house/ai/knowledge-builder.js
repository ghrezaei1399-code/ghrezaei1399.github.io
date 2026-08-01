// knowledge-builder.js - ساخت اشیاء دانش
class KnowledgeBuilder {
    constructor() {
        this.knowledgeObjects = [];
        this.relations = [];
        console.log('✅ KnowledgeBuilder initialized');
    }

    build(data) {
        const knowledge = {
            id: `knowledge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: data.type || 'article',
            title: data.title || 'بدون عنوان',
            author: data.author || 'ناشناس',
            year: data.year || new Date().getFullYear(),
            summary: data.summary || 'خلاصه در دسترس نیست',
            capabilities: data.capabilities || ['هفت قابلیت: ندارد'],
            fullText: data.fullText || '',
            keywords: data.keywords || [],
            metadata: {
                wordCount: data.fullText ? data.fullText.split(/\s+/).length : 0,
                processedAt: new Date().toISOString(),
                ...data.metadata
            },
            relations: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.knowledgeObjects.push(knowledge);
        this.findRelations(knowledge);
        
        console.log(`✅ Knowledge object created: ${knowledge.id} (${knowledge.title})`);
        return knowledge;
    }

    findRelations(knowledge) {
        for (const existing of this.knowledgeObjects) {
            if (existing.id === knowledge.id) continue;
            
            const relation = this.calculateRelation(knowledge, existing);
            if (relation) {
                this.relations.push(relation);
                knowledge.relations.push(relation);
                existing.relations.push(relation);
                console.log(`🔗 Relation found: ${knowledge.title} ↔ ${existing.title} (score: ${relation.score})`);
            }
        }
    }

    calculateRelation(obj1, obj2) {
        let score = 0;
        const reasons = [];
        
        if (this.textSimilarity(obj1.title, obj2.title) > 0.3) {
            score += 20;
            reasons.push('شباهت عنوان');
        }
        
        if (obj1.author && obj2.author && obj1.author === obj2.author) {
            score += 15;
            reasons.push('نویسنده مشترک');
        }
        
        if (Math.abs(obj1.year - obj2.year) <= 2) {
            score += 10;
            reasons.push('سال انتشار نزدیک');
        }
        
        const commonKeywords = this.findCommonKeywords(obj1.keywords || [], obj2.keywords || []);
        if (commonKeywords.length > 0) {
            score += commonKeywords.length * 5;
            reasons.push(`کلمات کلیدی مشترک: ${commonKeywords.join(', ')}`);
        }
        
        if (score > 20) {
            return {
                source: obj1.id,
                target: obj2.id,
                score: score,
                reasons: reasons,
                type: this.getRelationType(score)
            };
        }
        
        return null;
    }

    textSimilarity(text1, text2) {
        const words1 = new Set(text1.split(/\s+/));
        const words2 = new Set(text2.split(/\s+/));
        const intersection = new Set([...words1].filter(x => words2.has(x)));
        const union = new Set([...words1, ...words2]);
        return intersection.size / union.size;
    }

    findCommonKeywords(keywords1, keywords2) {
        return keywords1.filter(k => keywords2.includes(k));
    }

    getRelationType(score) {
        if (score > 50) return 'strong';
        if (score > 30) return 'medium';
        return 'weak';
    }

    getStatistics() {
        return {
            totalObjects: this.knowledgeObjects.length,
            totalRelations: this.relations.length,
            objectsByType: this.knowledgeObjects.reduce((acc, obj) => {
                acc[obj.type] = (acc[obj.type] || 0) + 1;
                return acc;
            }, {})
        };
    }

    getAllKnowledge() {
        return this.knowledgeObjects;
    }

    getRelations() {
        return this.relations;
    }
}

// ایجاد نمونه جهانی
const knowledgeBuilder = new KnowledgeBuilder();
console.log('✅ KnowledgeBuilder module loaded');
