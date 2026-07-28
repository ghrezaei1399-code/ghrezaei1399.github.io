const ArticleAgent = {

    name: "Article Reader",

    version: "2.0",

    async scan(memory){

        const response = await fetch("library.json");
        const library = await response.json();

        let scanned = 0;
        let processed = 0;

        for(const article of library.articles){

            scanned++;

            if(!memory.articles[article.title]){

                const knowledge =
                    await Extractors.extract(article);

                memory.articles[article.title] = knowledge;

                processed++;

            }

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
