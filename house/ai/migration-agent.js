const MigrationAgent = {

    name: "Migration Agent",

    version: "1.0",

    async run(memory){

        let migrated = 0;

        const articles = memory.articles || {};

        const fixed = {};

        for(const key of Object.keys(articles)){

            const item = articles[key];

            /*
            حافظه قدیمی:
            کلید = عنوان مقاله

            حافظه جدید:
            کلید = شناسه مقاله
            */

            const id =
                item.id ||
                (
                    item.title?.fa
                    ? "LEGACY-" + key
                    : key
                );


            if(!fixed[id]){

                fixed[id] = item;

                migrated++;

            }
            else{

                /*
                اگر نسخه تکراری بود،
                اطلاعات جدیدتر نگه داشته می‌شود
                */

                const oldTime =
                    new Date(
                        fixed[id].ai?.lastUpdate || 0
                    );

                const newTime =
                    new Date(
                        item.ai?.lastUpdate || 0
                    );


                if(newTime > oldTime){

                    fixed[id] = item;

                }

            }

        }


        memory.articles = fixed;


        /*
        بازسازی آمار
        */

        memory.statistics.knowledgeNodes =
            Object.keys(memory.articles).length;


        return {

            migrated

        };

    }

};
