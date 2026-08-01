// article-agent.js - نسخه با pdf.js (بدون تغییر در امضا)
const ArticleAgent = {
    name: "Article Reader",
    version: "5.2",

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
                    const pdfUrl = article.file;
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
                    console.warn("خطا در خواندن PDF با pdf.js:", e);
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
