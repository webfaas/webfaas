import * as chai from "chai";
import { WebFaaS } from "../WebFaaS";

describe("PathConfigFile", () => {
    it("getPathConfigFile", function(){
        const faas = new WebFaaS();
        chai.expect(faas.getPathConfigFile()).to.eq("");
        chai.expect(faas.getPathConfigFile()).to.eq(""); //force cache
    })
})