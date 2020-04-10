import * as path from "path";
import * as chai from "chai";
import { WebFaaS } from "../WebFaaS";

describe("CommandData", () => {
    it("convertArgsToCommandData", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData([]);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql([]);
    })

    it("convertArgsToCommandData help", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData(["help"]);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(true);
        chai.expect(command1.plugins).to.eql([]);
    })

    it("convertArgsToCommandData --help", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData(["--help"]);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(true);
        chai.expect(command1.plugins).to.eql([]);
    })

    it("convertArgsToCommandData --config config1", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData(["--config", "config1"]);
        chai.expect(command1.config).to.eq("config1");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql([]);
    })

    it("convertArgsToCommandData --plugins folder1,folder2,folder3", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData(["--plugins", "folder1,folder2,folder3"]);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql(["folder1", "folder2", "folder3"]);
    })

    it("convertArgsToCommandData --config config1 --plugins folder1,folder2,folder3", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData(["--config", "config1", "--plugins", "folder1,folder2,folder3"]);
        chai.expect(command1.config).to.eq("config1");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql(["folder1", "folder2", "folder3"]);
    })

    it("convertArgsToCommandData --config config1 --plugins folder1,folder2,folder3 --paramnotexist param1", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData(["--config", "config1", "--plugins", "folder1,folder2,folder3", "--paramnotexist", "param1"]);
        chai.expect(command1.config).to.eq("config1");
        chai.expect(command1.help).to.eq(true);
        chai.expect(command1.plugins).to.eql(["folder1", "folder2", "folder3"]);
    })

    it("convertArgsToCommandData --config --plugins", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData(["--config", " ", "--plugins", " "]);
        console.log("command1", command1);
        chai.expect(command1.config).to.eq("");
        chai.expect(command1.help).to.eq(false);
        chai.expect(command1.plugins).to.eql([""]);
    })

    it("configureByCommandData - plugins", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData(["--config", "config1", "--plugins", "folder1,folder2,folder3"]);
        faas.configureByCommandData(command1);
    })

    it("configureByCommandData - whitout plugins", function(){
        const faas = new WebFaaS();
        let command1 = faas.convertArgsToCommandData(["--config", "config1"]);
        faas.configureByCommandData(command1);
    })
})