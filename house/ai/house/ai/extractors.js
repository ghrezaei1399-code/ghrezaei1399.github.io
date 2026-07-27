const Extractors = {

    version: "1.0",

    async extract(article){

        return {

            title: article.title,

            summary: "",

            capabilities: {

                capability1: "",

                capability2: "",

                capability3: "",

                capability4: "",

                capability5: "",

                capability6: "",

                capability7: ""

            },

            keywords: [],

            status: "waiting_ai"

        };

    }

};
