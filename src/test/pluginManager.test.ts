import * as path from "path";
import * as chai from "chai";
import { WebFaaS } from "../WebFaaS";

describe("PluginManager", () => {
    it("default", function(){
        const faas = new WebFaaS();
        chai.expect(faas.getPluginManager().listPlugin.length).to.eql(6);
    })

    it("simulate whithout node_module", function(){
        const faas = new WebFaaS();
        faas.setPathNodeModulesDirectory("");
        chai.expect(faas.getPluginManager().listPlugin.length).to.eql(0);
    })
})