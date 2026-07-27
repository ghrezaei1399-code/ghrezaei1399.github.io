const Brain = {

    memoryFile: "ai/memory.json",

    async start() {

        const status = document.getElementById("brain-status");

        try {

            const response = await fetch(this.memoryFile);

            const memory = await response.json();
for (const agent of agents){

    const result = await agent.scan(memory);

    console.log(agent.name, result);

}
            status.innerHTML =
                "<b>مغز فعال شد.</b><br>" +
                "نسخه حافظه: " + memory.version + "<br>" +
                "تعداد مقاله‌ها: " + memory.articles.length;

            console.log(memory);

        }

        catch (error) {

            status.innerHTML =
                "<b>خطا در بارگذاری حافظه.</b>";

            console.error(error);

        }

    }

};
const agents = [
    ArticleAgent
];
document.addEventListener("DOMContentLoaded", () => {

    Brain.start();

});
