const agents = [
    MigrationAgent,
    ArticleAgent,
    RelationAgent
];

const Brain = {
    memoryFile: "memory.json",
    async start() {
        const status = document.getElementById("brain-status");
        const technical = document.getElementById("technical-details");
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

            if (KnowledgeBuilder.updateState) {
                KnowledgeBuilder.updateState(memory);
            }

            // نمایش اطلاعات فنی در بخش technical
            if (technical) {
                technical.innerHTML = `
                    <p><strong>وضعیت:</strong> مغز فعال شد.</p>
                    <p><strong>نسخه حافظه:</strong> ${memory.version}</p>
                    <p><strong>مقاله‌های موجود در مخزن:</strong> ${scanned}</p>
                    <p><strong>مقاله‌های جدید:</strong> ${processed}</p>
                    <p><strong>ثبت‌شده در حافظه:</strong> ${Object.keys(memory.articles).length}</p>
                    <p><strong>روابط جدید ساخته‌شده:</strong> ${relationsCreated}</p>
                `;
            }

            // نمایش پیام ساده برای مخاطب
            status.innerHTML = `✅ سیستم آماده است. ${Object.keys(memory.articles).length} مقاله پردازش شد.`;

            UIDisplay.renderAll(memory);
            console.log(memory);
        } catch (error) {
            status.innerHTML = "❌ خطا در اجرای مغز.";
            if (technical) {
                technical.innerHTML = `<p style="color:red;">خطا: ${error.message}</p>`;
            }
            console.error(error);
        }
    }
};

document.addEventListener("DOMContentLoaded", () => Brain.start());
