const ArticleAgent = {
    name: "Article Reader",
    version: "4.7",
    async scan(memory) {
        console.log("ArticleAgent started");
        const response = await fetch("library.json");
        const library = await response.json();
        let scanned = 0, processed = 0;
        for (const article of library.articles) {
            scanned++;
            if (!memory.articles[article.id]) {
                // خواندن متن کامل از فایل PDF
                let fullText = "";
                try {
                    const pdfResponse = await fetch(article.file);
                    if (!pdfResponse.ok) throw new Error('PDF not found');
                    const pdfBuffer = await pdfResponse.arrayBuffer();
                    const pdf = await pdfParse(pdfBuffer);
                    fullText = pdf.text;
                } catch (e) {
                    console.warn(`خطا در خواندن PDF برای ${article.id}:`, e);
                    fullText = `${article.title}. ${article.tags.join('، ')}`;
                }
                // استفاده از Extractors با متن کامل
                const extracted = await Extractors.extract(article, fullText);
                const newArticle = await KnowledgeBuilder.build(article, extracted);
                memory.articles[article.id] = newArticle;
                processed++;
            }
        }
        memory.statistics.totalArticles = scanned;
        memory.statistics.processedArticles = Object.keys(memory.articles).length;
        return { scanned, processed };
    }
};
