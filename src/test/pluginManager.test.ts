import * as path from "path";
import * as chai from "chai";
import { WebFaaS } from "../lib/WebFaaS";

describe("PluginManager", () => {
    it("default", function(){
        const faas = new WebFaaS();
        faas.scanAndLoadPlugins();
        chai.expect(faas.getPluginManager().listPlugin.length).to.eql(1);
    })

    it("simulate whithout node_module", function(){
        const faas = new WebFaaS();
        faas.setPathNodeModulesDirectory("");
        faas.scanAndLoadPlugins();
        chai.expect(faas.getPluginManager().listPlugin.length).to.eql(0);
    })
})