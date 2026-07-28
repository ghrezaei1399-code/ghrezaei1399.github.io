const agents = [
    ArticleAgent
];

const Brain = {

    memoryFile: "memory.json",

    async start() {

        const status = document.getElementById("brain-status");

        try {

           const response = await fetch(this.memoryFile);
const defaultMemory = await response.json();

const memory =
    await StorageManager.load(defaultMemory);

            let scanned = 0;
            let processed = 0;

            for (const agent of agents) {

                const result = await agent.scan(memory);

                scanned += result.scanned;
                processed += result.processed;

            }

           const articles = Object.values(memory.articles);

status.innerHTML = `
<b>مغز فعال شد.</b><br><br>
نسخه حافظه: ${memory.version}<br>
مقاله‌های موجود در مخزن: ${scanned}<br>
مقاله‌های جدید: ${processed}<br>
ثبت‌شده در حافظه: ${articles.length}<br><br>

<b>وضعیت پردازش:</b><br>

${articles.map(a =>
`📄 ${a.title}<br>
مرحله: ${a.ai.state}<br>
آخرین بروزرسانی: ${a.ai.lastUpdate}<br><br>`
).join("")}
`;

            console.log(memory);

        }

        catch (error) {
StorageManager.save(memory);
            status.innerHTML =
                "<b>خطا در اجرای مغز.</b>";

            console.error(error);

        }

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Brain.start();

});
