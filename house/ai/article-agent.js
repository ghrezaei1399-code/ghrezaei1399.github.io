const ArticleAgent = {

    name: "Article Reader",

    version: "3.8",

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

                // استفاده از متن نمونه برای تست
                const sampleText = `عنوان: ${article.title}. این یک متن نمونه از مقاله است.`;
                const newArticle = await KnowledgeBuilder.build(article, sampleText);
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
