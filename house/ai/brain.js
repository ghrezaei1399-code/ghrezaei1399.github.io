const SmartHouse = {

    version: "0.1",

    status: "ACTIVE",

    articles: [],

    load() {

        console.log("================================");
        console.log("Smart House Brain Started");
        console.log("Version:", this.version);
        console.log("================================");

    }

};

document.addEventListener("DOMContentLoaded", () => {

    SmartHouse.load();

});
