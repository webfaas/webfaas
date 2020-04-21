"use strict";

import { WebFaaS } from "../WebFaaS";

const faas = new WebFaaS();

(async function(){
    await faas.start();

    var moduleSum: any = await faas.getCore().import("@webfaaslabs/mathsum", "0.0.1");
    console.log("2 + 3 = ", moduleSum(2,3));
    
    await faas.stop();
})();