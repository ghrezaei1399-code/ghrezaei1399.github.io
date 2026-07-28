const Extractors = {

    version: "2.0",

    async extract(article){

        return {

            id: article.id,

            type: article.type,

            language: article.language,

            title: {

                fa: article.title,

                en: ""

            },

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

            relations: article.relations,

            ai: {

                stage: 1,

                state: "registered",

                score: 0,

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
