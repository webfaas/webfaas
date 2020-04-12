import * as chai from "chai";
import { WebFaaS } from "../WebFaaS";

describe("PathNodeModulesDirectory", () => {
    it("getPathNodeModulesDirectory", function(){
        const faas = new WebFaaS();
        chai.expect(faas.getPathNodeModulesDirectory()).to.include("node_modules");
        chai.expect(faas.getPathNodeModulesDirectory()).to.include("node_modules"); //force cache
    })
})