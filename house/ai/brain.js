const Brain = {

    memoryFile: "ai/memory.json",

    async start() {

        const status = document.getElementById("brain-status");

        try {

            const response = await fetch(this.memoryFile);

            const memory = await response.json();

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

document.addEventListener("DOMContentLoaded", () => {

    Brain.start();

});
