"use strict";

import { WebFaaS } from "../WebFaaS";

const faas = new WebFaaS();

(async function(){
    await faas.start();

    var response = await faas.getCore().invokeAsync("@webfaaslabs/mathsum", "0.0.1", "", [2,3], "npm");
    console.log("2 + 3 = ", response);
})();