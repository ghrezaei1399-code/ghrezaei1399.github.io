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
        return memory;
    },
    save(memory) {
        localStorage.setItem(this.key, JSON.stringify(memory));
    },
    clear() {
        localStorage.removeItem(this.key);
    },
    ensureStructure(memory) {
        memory.articles = memory.articles || {};
        memory.books = memory.books || {};
        memory.posters = memory.posters || {};
        memory.rooms = memory.rooms || {};
        memory.products = memory.products || {};
        memory.people = memory.people || {};
        memory.organizations = memory.organizations || {};
        memory.media = memory.media || {};
        memory.relations = memory.relations || [];
        memory.timeline = memory.timeline || [];
        memory.statistics = memory.statistics || {};
        memory.statistics.totalArticles = memory.statistics.totalArticles || 0;
        memory.statistics.processedArticles = memory.statistics.processedArticles || 0;
        memory.statistics.totalBooks = memory.statistics.totalBooks || 0;
        memory.statistics.totalPosters = memory.statistics.totalPosters || 0;
        memory.statistics.knowledgeNodes = memory.statistics.knowledgeNodes || 0;
        memory.statistics.knowledgeEdges = memory.statistics.knowledgeEdges || 0;
        memory.version = memory.version || "1.0";
        return memory;
    }
};
