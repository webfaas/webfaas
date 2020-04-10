import * as path from "path";
import * as chai from "chai";
import { WebFaaS } from "../WebFaaS";
import { Config } from "@webfaas/webfaas-core/lib/Config/Config";

describe("SearchModulesFolder", () => {
    it("searchModulesFolder", function(){
        const faas = new WebFaaS();
        const original = require.main;
        require.main = undefined;
        chai.expect(faas.searchModulesFolder()).to.include("node_modules");
        require.main = original;
        let config1 = new Config();
        faas.setConfig(config1);
    })

    //process.env["WEBFAAS_CONFIG"] = "/tmp";
    //process.env["WEBFAAS_CONFIG"] = "";
})