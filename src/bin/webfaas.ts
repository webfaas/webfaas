#!/usr/bin/env node

import { WebFaaS } from "../WebFaaS";

console.log("Starting server...");

const faas = new WebFaaS();
const commandData = faas.convertArgsToCommandData(process.argv.slice(2));

faas.configureByCommandData(commandData);

faas.start().then(() => {
    console.log("Server started");
}).catch((errFaas)=>{
    console.error("Err: ", errFaas);
    process.exit(1);
});

process.on("SIGTERM", async () => {
    console.log("Server shutdown...");
    await faas.stop();
    console.log("Server stoped");
});