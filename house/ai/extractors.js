const Extractors = {
    version: "1.0",
    extract(article) {
        // استخراج داده‌ها از مقاله
        return {
            summary: {
                fa: `خلاصه مقاله ${article.title}`,
                en: ""
            },
            sevenCapabilities: {
                fa: article.tags || [],
                en: []
            }
        };
    }
};
