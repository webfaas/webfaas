import * as path from "path";
import * as chai from "chai";
import { WebFaaS } from "../lib/WebFaaS";

describe("default", () => {
    const faas = new WebFaaS();
    
    it("getCore", function(){
        chai.expect(typeof(faas.getCore())).to.eq("object");
    })

    it("start", async function(){
        await faas.start();
        chai.expect(faas.getStarted()).to.eq(true);
        await faas.start();
        chai.expect(faas.getStarted()).to.eq(true);
    })

    it("stop", async function(){
        await faas.stop();
        chai.expect(faas.getStarted()).to.eq(false);
        await faas.stop();
        chai.expect(faas.getStarted()).to.eq(false);
    })
})