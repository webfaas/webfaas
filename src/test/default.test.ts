import * as path from "path";
import * as chai from "chai";
import { WebFaaS } from "../WebFaaS";

describe("convertArgsToCommandData", () => {
    const faas = new WebFaaS();
    
    it("getCore", function(){
        chai.expect(typeof(faas.getCore())).to.eq("object");
    })

    it("start", async function(){
        await faas.start();
    })

    it("stop", async function(){
        await faas.stop();
    })

    it("printHelp", function(){
        faas.printHelp();
    })
})