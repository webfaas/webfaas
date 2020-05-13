"use strict";

import { WebFaaS } from "../lib/WebFaaS";
import { IMessage, IMessageHeaders } from "@webfaas/webfaas-core";

const faas = new WebFaaS();
faas.scanAndLoadPlugins();

(async function(){
    await faas.start();

    let msgSum = {} as IMessage;
    msgSum.header = {} as IMessageHeaders;
    msgSum.header.messageID = "1";
    msgSum.header.name = "@webfaaslabs/math";
    msgSum.header.method = "sum";
    msgSum.header.version = "0.0.1";
    msgSum.payload = {x:2,y:3};

    let msgMultiply = {} as IMessage;
    msgMultiply.header = {} as IMessageHeaders;
    msgMultiply.header.messageID = "1";
    msgMultiply.header.name = "@webfaaslabs/math";
    msgMultiply.header.method = "multiply";
    msgMultiply.header.version = "0.0.1";
    msgMultiply.payload = {x:2,y:3};

    let responseSum = await faas.getCore().sendMessage(msgSum);
    console.log("2 + 3 = ", responseSum);

    let responseMultiply = await faas.getCore().sendMessage(msgMultiply);
    console.log("2 * 3 = ", responseMultiply);
    
    await faas.stop();
})();