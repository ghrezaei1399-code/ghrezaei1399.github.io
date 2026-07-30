const ArticleAgent = {

    name: "Article Reader",

    version: "3.4",

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

                // استفاده از متن نمونه به جای خواندن PDF
                const sampleText = "این یک متن نمونه از مقاله هوشمندسازی همراهان روشنایی است. این مقاله به بررسی چارچوبی نوآورانه برای مهندسی فرهنگی در عصر هوش مصنوعی می‌پردازد و راهکارهایی برای تعامل انسان و ماشین ارائه می‌دهد. هوش مصنوعی همراهان روشنایی به عنوان یک چارچوب نوین برای مدیریت دانش و فرهنگ در عصر دیجیتال معرفی شده است.";

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
