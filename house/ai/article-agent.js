const ArticleAgent = {

    name: "Article Reader",

    version: "1.0",

    async scan(memory){

        const response = await fetch("ai/library.json");
        const library = await response.json();

        let scanned = 0;
        let processed = 0;

        for(const article of library.articles){

            scanned++;

            if(!memory.articles[article.title]){

                memory.articles[article.title]={
                    title:article.title,
                    file:article.file,
                    status:"waiting",
                    capabilities:null
                };

                processed++;

            }

        }

        memory.statistics.totalArticles=scanned;
        memory.statistics.processedArticles=
            Object.keys(memory.articles).length;

        return{
            scanned,
            processed
        };

    }

};
