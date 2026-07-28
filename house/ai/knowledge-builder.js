const KnowledgeBuilder = {

    version: "1.0",

    async build(article){

        return {

            id: article.title,

            title: article.title,

            summary: "",

            sevenCapabilities: [

                "", "", "", "", "", "", ""

            ],

            keywords: [],

            relations: [],

            created: new Date().toISOString(),

            status: "waiting"

        };

    }

};
