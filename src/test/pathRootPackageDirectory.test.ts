import * as chai from "chai";
import { WebFaaS } from "../WebFaaS";

describe("PathRootPackageDirectory", () => {
    it("getPathRootPackageDirectory", function(){
        const faas = new WebFaaS();
        chai.expect(faas.getPathRootPackageDirectory()).to.include("webfaas");
        chai.expect(faas.getPathRootPackageDirectory()).to.include("webfaas"); //force cache
    })

    it("getPathRootPackageDirectory - simulate not exist", function(){
        const faas = new WebFaaS();
        faas.setPathCurrentWorkingDirectory("/notexist");
        chai.expect(faas.getPathRootPackageDirectory()).to.include("");
        chai.expect(faas.getPathRootPackageDirectory()).to.include(""); //force cache
    })
})