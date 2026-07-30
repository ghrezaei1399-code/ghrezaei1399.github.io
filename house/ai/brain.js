const agents = [
    MigrationAgent,
    ArticleAgent,
    RelationAgent
];

const Brain = {
    memoryFile: "memory.json",
    async start() {
        const status = document.getElementById("brain-status");
        try {
            await SelfHealing.run();
            const response = await fetch(this.memoryFile);
            const defaultMemory = await response.json();
            const memory = await StorageManager.load(defaultMemory);
            console.log(JSON.stringify(memory, null, 2));

            let scanned = 0, processed = 0, relationsCreated = 0;
            for (const agent of agents) {
                const result = await agent.scan(memory);
                if (agent.name === "Article Reader") {
                    scanned = result.scanned;
                    processed = result.processed;
                }
                if (agent.name === "Relation Agent") {
                    relationsCreated = result.processed;
                }
            }

            // به‌روزرسانی مرحله
            if (KnowledgeBuilder.updateState) {
                KnowledgeBuilder.updateState(memory);
            }

            UIDisplay.renderAll(memory);
            const articles = Object.values(memory.articles);
            status.innerHTML = `
                <b>مغز فعال شد.</b><br><br>
                نسخه حافظه: ${memory.version}<br>
                مقاله‌های موجود در مخزن: ${scanned}<br>
                مقاله‌های جدید: ${processed}<br>
                ثبت‌شده در حافظه: ${articles.length}<br><br>
                روابط جدید ساخته‌شده: ${relationsCreated}
            `;
            console.log(memory);
        } catch (error) {
            status.innerHTML = "<b>خطا در اجرای مغز.</b>";
            console.error(error);
        }
    }
};

document.addEventListener("DOMContentLoaded", () => Brain.start());
