const KnowledgeGraph = {

    version: "1.0",

    rebuild(memory){

        memory.relations = [];

        for(const id in memory.articles){

            const node = memory.articles[id];

            for(const target of node.relations.books){

                this.connect(memory,id,target,"book");

            }

            for(const target of node.relations.articles){

                this.connect(memory,id,target,"article");

            }

            for(const target of node.relations.posters){

                this.connect(memory,id,target,"poster");

            }

            for(const target of node.relations.rooms){

                this.connect(memory,id,target,"room");

            }

        }

        memory.statistics.knowledgeEdges =
            memory.relations.length;

    },

    connect(memory,from,to,type){

        memory.relations.push({

            from,

            to,

            type,

            created:new Date().toISOString()

        });

    }

};
