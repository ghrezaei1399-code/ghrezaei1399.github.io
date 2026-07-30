const ArticleAgent = {

    name: "Article Reader",

    version: "3.7",

    async scan(memory) {

        console.log("ArticleAgent started");

        const response = await fetch("library.json");

        const library = await response.json();

        let scanned = 0;

        let processed = 0;

        for (const article of library.articles) {

            scanned++;

            delete memory.articles[article.title];
            delete memory.articles[article.title?.fa];

            if (!memory.articles[article.id]) {

                // خواندن متن واقعی از فایل PDF
                 let pdfText = "";
                try {
                    const pdfResponse = await fetch(article.file);
                    if (!pdfResponse.ok) {
                        throw new Error(`HTTP error! status: ${pdfResponse.status}`);
                    }
                    const pdfBuffer = await pdfResponse.arrayBuffer();
                    const pdf = await pdfParse(pdfBuffer);
                    pdfText = pdf.text;
                } catch (e) {
                    console.warn("خطا در خواندن PDF:", e);
                    pdfText = "متن مقاله در دسترس نیست";
                }

                const newArticle = await KnowledgeBuilder.build(article, pdfText);
                memory.articles[article.id] = newArticle;
                processed++;

            } else {

                const node = memory.articles[article.id];
                node.project = article.project;
                node.domain = article.domain;
                node.priority = article.priority;
                node.keywords.fa = article.tags || [];
                node.source = article.file;
                node.ai.lastUpdate = new Date().toISOString();
                node.id = article.id;

            }

            article.status = "indexed";

        }

        memory.statistics.totalArticles = scanned;
        memory.statistics.processedArticles = Object.keys(memory.articles).length;

        return { scanned, processed };

    }

};
