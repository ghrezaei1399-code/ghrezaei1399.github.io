const KnowledgeBuilder = {

    version: "1.1",

    async build(article){

        return {

            id: article.id,

            type: article.type,

            language: article.language,

            title: {

                fa: article.title,

                en: ""

            },

            source: article.file,

            summary: {

                fa: "",

                en: ""

            },

            sevenCapabilities: {

                fa: [],

                en: []

            },

            keywords: {

                fa: article.tags || [],

                en: []

            },

            project: article.project,

            domain: article.domain,

            priority: article.priority,

            relations: {

                books: [],

                articles: [],

                posters: [],

                rooms: [],

                products: [],

                people: [],

                organizations: []

            },

            ai: {

                stage: 1,

                state: "discovered",

                score: 0,

                lastUpdate: new Date().toISOString(),

                history: [

                    {

                        action: "registered",

                        time: new Date().toISOString()

                    }

                ]

            }

        };

    }

};
