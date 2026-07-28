const StorageManager = {

    key: "RTAI_MEMORY",

    async load(defaultMemory) {

        const local = localStorage.getItem(this.key);

        if (!local) {

            this.save(defaultMemory);

            return defaultMemory;

        }

        let memory = JSON.parse(local);

        memory = this.ensureStructure(memory);

        this.save(memory);

        return structuredClone(defaultMemory);

    },

    save(memory) {

        localStorage.setItem(

            this.key,

            JSON.stringify(memory)

        );

    },

    clear() {

        localStorage.removeItem(this.key);

    },

    ensureStructure(memory){

        memory.articles ??= {};

        memory.books ??= {};

        memory.posters ??= {};

        memory.rooms ??= {};

        memory.products ??= {};

        memory.people ??= {};

        memory.organizations ??= {};

        memory.media ??= {};

        memory.relations ??= [];

        memory.timeline ??= [];

        memory.statistics ??= {};

        memory.statistics.totalArticles ??= 0;

        memory.statistics.processedArticles ??= 0;

        memory.statistics.totalBooks ??= 0;

        memory.statistics.totalPosters ??= 0;

        memory.statistics.knowledgeNodes ??= 0;

        memory.statistics.knowledgeEdges ??= 0;

        memory.version ??= "1.0";

        return memory;

    }

};
