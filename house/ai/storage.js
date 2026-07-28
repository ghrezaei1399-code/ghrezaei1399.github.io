const StorageManager = {

    key: "RTAI_MEMORY",

    async load(defaultMemory) {

        const local = localStorage.getItem(this.key);

        if (local) {

            return JSON.parse(local);

        }

        localStorage.setItem(
            this.key,
            JSON.stringify(defaultMemory)
        );

        return defaultMemory;

    },

    save(memory) {

        localStorage.setItem(
            this.key,
            JSON.stringify(memory)
        );

    },

    clear() {

        localStorage.removeItem(this.key);

    }

};
