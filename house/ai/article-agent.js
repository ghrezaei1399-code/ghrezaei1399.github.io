const ArticleAgent = {

    name: "Article Reader",

    version: "3.0",

    async scan(memory){
console.log("ArticleAgent started");
        const response = await fetch("library.json");

        const library = await response.json();

        let scanned = 0;

        let processed = 0;

        for(const article of library.articles){

            scanned++;

            if(!memory.articles[article.id]){

                memory.articles[article.id] =
                    await KnowledgeBuilder.build(article);

                processed++;

            }
            else{

                const node = memory.articles[article.id];

                node.project = article.project;

                node.domain = article.domain;

                node.priority = article.priority;

                node.keywords.fa = article.tags || [];

                node.source = article.file;

                node.ai.lastUpdate =
                    new Date().toISOString();

            }

            article.status = "indexed";

        }

        memory.statistics.totalArticles = scanned;

        memory.statistics.processedArticles =
            Object.keys(memory.articles).length;

        return {

            scanned,

            processed

        };

    }

};
