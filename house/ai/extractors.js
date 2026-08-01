// extractors.js - استخراج خلاصه و قابلیت‌ها
class Extractors {
    constructor() {
        this.minTextLength = 100;
        console.log('✅ Extractors initialized');
    }

    extractSummary(text) {
        if (!text || text.length < this.minTextLength) {
            return 'خلاصه در دسترس نیست - متن کافی برای استخراج وجود ندارد';
        }

        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
        const firstSentence = sentences.length > 0 ? sentences[0].trim() : '';
        const secondSentence = sentences.length > 1 ? sentences[1].trim() : '';
        
        const keywords = this.extractKeywords(text);
        
        let summary = '';
        if (firstSentence) {
            summary += firstSentence + '. ';
        }
        if (secondSentence && secondSentence !== firstSentence) {
            summary += secondSentence + '. ';
        }
        
        if (keywords.length > 0) {
            summary += `کلمات کلیدی: ${keywords.slice(0, 5).join('، ')}.`;
        }
        
        return summary || 'خلاصه در دسترس نیست';
    }

    extractCapabilities(text) {
        if (!text || text.length < this.minTextLength) {
            return ['هفت قابلیت: متن کافی برای استخراج وجود ندارد'];
        }

        const capabilities = [];
        
        const patterns = [
            /(?:قابلیت|توانایی|کاربرد|ویژگی|امکان)\s*[:-]?\s*([^،.؛\n]+)/gi,
            /(?:می‌تواند|می‌توان|قادر است|قادر به)\s*([^،.؛\n]+)/gi,
            /(?:ارائه می‌دهد|فراهم می‌کند|دارای)\s*([^،.؛\n]+)/gi
        ];
        
        for (const pattern of patterns) {
            const matches = text.matchAll(pattern);
            for (const match of matches) {
                if (match[1] && match[1].trim().length > 5) {
                    const capability = match[1].trim().replace(/\s+/g, ' ');
                    if (!capabilities.includes(capability) && capabilities.length < 7) {
                        capabilities.push(capability);
                    }
                }
            }
        }
        
        if (capabilities.length === 0) {
            const keywords = this.extractKeywords(text, 7);
            if (keywords.length > 0) {
                capabilities.push(...keywords.map(k => `قابلیت ${k}`));
            } else {
                capabilities.push('هفت قابلیت: قابل استخراج نیست');
            }
        }
        
        return capabilities.slice(0, 7);
    }

    extractKeywords(text, maxWords = 10) {
        const stopWords = ['و', 'با', 'از', 'برای', 'به', 'در', 'این', 'آن', 'که', 'را', 'های', 'نیز', 'هم', 'یا', 'تا', 'بر', 'بدون'];
        const words = text.toLowerCase().split(/\s+/);
        const wordFreq = {};
        
        for (const word of words) {
            const cleanWord = word.replace(/[،.؛؟!?:;'"()\[\]{}،]/g, '');
            if (cleanWord.length > 3 && !stopWords.includes(cleanWord)) {
                wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
            }
        }
        
        const sorted = Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, maxWords)
            .map(entry => entry[0]);
        
        return sorted;
    }

    extractAll(text) {
        return {
            summary: this.extractSummary(text),
            capabilities: this.extractCapabilities(text),
            keywords: this.extractKeywords(text, 10),
            wordCount: text ? text.split(/\s+/).length : 0
        };
    }
}

// ایجاد نمونه جهانی
const extractors = new Extractors();
console.log('✅ Extractors module loaded');
