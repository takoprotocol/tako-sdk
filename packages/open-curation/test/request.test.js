//proxy.setConfig("http://127.0.0.1:19180");
//proxy.start();
const axios = require("axios");


(async () => {
    try {
        const url = "https://google.com"
        const res = await axios.get(url);
        console.log(res.status);
    } catch (error) {
        console.log(`error:${error}`);
    }
})()