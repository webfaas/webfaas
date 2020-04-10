import * as path from "path";
import * as chai from "chai";
import { WebFaaS } from "../WebFaaS";
import { Config } from "@webfaas/webfaas-core/lib/Config/Config";

describe("Config", () => {
    it("setConfig", function(){
        const faas = new WebFaaS();
        let config1 = new Config();
        faas.setConfig(config1);
        chai.expect(faas.getConfig()).to.eq(config1);
    })

    it("getConfig", function(){
        const faas = new WebFaaS();
        chai.expect(faas.getConfig().get("key1")).to.null;
    })

    it("searchConfigFile", function(){
        const faas = new WebFaaS();
        process.env["WEBFAAS_CONFIG"] = "/tmp";
        chai.expect(faas.searchConfigFile()).to.eq("/tmp");
        process.env["WEBFAAS_CONFIG"] = "";
    })
})