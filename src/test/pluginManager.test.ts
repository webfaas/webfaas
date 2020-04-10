import * as path from "path";
import * as chai from "chai";
import { WebFaaS } from "../WebFaaS";

describe("PluginManager", () => {
    it("convertArgsToCommandData", function(){
        const faas = new WebFaaS();
        chai.expect(faas.getPluginManager().listPlugin.length).to.eql(5);
    })
})