const RelationAgent = {

    name: "Relation Agent",

    version: "1.0",

    async scan(memory){

        const ids = Object.keys(memory.articles);

        let created = 0;

        for(let i=0;i<ids.length;i++){

            for(let j=i+1;j<ids.length;j++){

                const a = memory.articles[ids[i]];
                const b = memory.articles[ids[j]];

                const common = [];

                for(const tag of a.keywords.fa){

                    if(b.keywords.fa.includes(tag)){

                        common.push(tag);

                    }

                }

                if(common.length>0){

                    a.relations.articles.push(b.id);

                    b.relations.articles.push(a.id);

                    created++;

                }

            }

        }

        return {

            scanned: ids.length,

            processed: created

        };

    }

};
