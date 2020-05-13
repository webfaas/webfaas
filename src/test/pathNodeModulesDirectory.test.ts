import * as chai from "chai";
import { WebFaaS } from "../lib/WebFaaS";

describe("PathNodeModulesDirectory", () => {
    it("getPathNodeModulesDirectory", function(){
        const faas = new WebFaaS();
        chai.expect(faas.getPathNodeModulesDirectory()).to.include("node_modules");
        chai.expect(faas.getPathNodeModulesDirectory()).to.include("node_modules"); //force cache
    })

    it("setPathNodeModulesDirectory", function(){
        const faas = new WebFaaS();
        faas.setPathNodeModulesDirectory("path1");
        chai.expect(faas.getPathNodeModulesDirectory()).to.eq("path1");
    })
})