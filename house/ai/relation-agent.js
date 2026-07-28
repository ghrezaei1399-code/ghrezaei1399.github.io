const RelationAgent = {

    name: "Relation Agent",

    version: "2.0",

    async scan(memory){

        const ids = Object.keys(memory.articles);

        let created = 0;

        for(let i = 0; i < ids.length; i++){

            for(let j = i + 1; j < ids.length; j++){

                const a = memory.articles[ids[i]];
                const b = memory.articles[ids[j]];

                if(a.id === b.id){

                    continue;

                }

                const common = [];

                for(const tag of a.keywords.fa){

                    if(b.keywords.fa.includes(tag)){

                        common.push(tag);

                    }

                }

                if(common.length === 0){

                    continue;

                }

                if(!a.relations.articles.includes(b.id)){

                    a.relations.articles.push(b.id);

                    created++;

                }

                if(!b.relations.articles.includes(a.id)){

                    b.relations.articles.push(a.id);

                }

            }

        }

        return {

            scanned: ids.length,

            processed: created

        };

    }

};
