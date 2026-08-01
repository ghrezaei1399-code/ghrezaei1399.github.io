// article-agent.js - نسخه نهایی با مسیرهای صحیح
const ArticleAgent = {
    name: "Article Reader",
    version: "7.0",

    async scan(memory) {
        console.log("ArticleAgent started with pdf.js");

        const response = await fetch("library.json");
        const library = await response.json();
        let scanned = 0, processed = 0;

        for (const article of library.articles) {
            scanned++;
            if (!memory.articles[article.id]) {
                let fullText = "";
                try {
                    // ساخت مسیر کامل فایل PDF
                    const pdfUrl = `/ghrezaei1399.github.io/house/ai/${article.file}`;
                    const loadingTask = pdfjsLib.getDocument(pdfUrl);
                    const pdf = await loadingTask.promise;
                    let text = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        const strings = content.items.map(item => item.str);
                        text += strings.join(" ") + "\n";
                    }
                    fullText = text;
                } catch (e) {
                    console.warn("خطا در خواندن PDF:", e);
                    fullText = `${article.title}. ${article.tags.join('، ')}`;
                }

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
