const agents = [
    ArticleAgent
];

const Brain = {

    memoryFile: "ai/memory.json",

    async start() {

        const status = document.getElementById("brain-status");

        try {

            const response = await fetch(this.memoryFile);
            const memory = await response.json();

            let scanned = 0;
            let processed = 0;

            for (const agent of agents) {

                const result = await agent.scan(memory);

                scanned += result.scanned;
                processed += result.processed;

            }

            status.innerHTML = `
<b>مغز فعال شد.</b><br><br>
نسخه حافظه: ${memory.version}<br>
مقاله‌های موجود در مخزن: ${scanned}<br>
مقاله‌های جدید: ${processed}<br>
ثبت‌شده در حافظه: ${Object.keys(memory.articles).length}
`;

            console.log(memory);

        }

        catch (error) {

            status.innerHTML =
                "<b>خطا در اجرای مغز.</b>";

            console.error(error);

        }

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Brain.start();

});
