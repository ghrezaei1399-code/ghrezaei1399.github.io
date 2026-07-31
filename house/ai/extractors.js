const Extractors = {
    version: "2.0",
    extract(article) {
        // تولید خلاصه از عنوان و برچسب‌ها
        const summary = `این مقاله با عنوان "${article.title}" به موضوعات ${article.tags.join('، ')} می‌پردازد.`;
        
        // تولید هفت قابلیت از برچسب‌ها و عنوان
        const capabilities = this.extractCapabilities(article);
        
        return {
            summary: {
                fa: summary,
                en: ""
            },
            sevenCapabilities: {
                fa: capabilities,
                en: []
            }
        };
    },
    extractCapabilities(article) {
        // ترکیب برچسب‌ها و کلمات کلیدی عنوان
        const words = article.title.split(' ');
        const caps = [...article.tags];
        // اضافه کردن کلمات کلیدی از عنوان
        for (const word of words) {
            if (word.length > 3 && !caps.includes(word)) {
                caps.push(word);
            }
            if (caps.length >= 7) break;
        }
        // تکمیل تا ۷ قابلیت
        while (caps.length < 7) {
            caps.push(`قابلیت ${caps.length + 1}`);
        }
        return caps.slice(0, 7);
    }
};
