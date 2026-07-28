const KnowledgeBuilder = {

    version: "1.1",

    async build(article){

        return {

            id: article.title,

            title: article.title,

            source: article.file,

            summary: null,

            sevenCapabilities: [],

            keywords: [],

            relations: {

                books: [],

                articles: [],

                posters: [],

                rooms: []

            },

            ai: {

                stage: 1,

                state: "discovered",

                lastUpdate: new Date().toISOString()

            }

        };

    }

};
