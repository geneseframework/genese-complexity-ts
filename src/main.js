"use strict";
exports.__esModule = true;
var ngCyclomaticComplexityRule_1 = require("../rules/ngCyclomaticComplexityRule");
var ts = require("typescript");
var fse = require("fs-extra");
var appRootPath = require('app-root-path');
var Main = /** @class */ (function () {
    function Main() {
        this.source = __dirname;
        this.appRoot = appRootPath.toString(); // Root of the app
    }
    Main.prototype.process = function () {
        console.log("SOURCE " + this.source);
        console.log("appRoot " + this.appRoot);
        console.log();
        var sourceFile = ts.createSourceFile('methods.mock.ts', fse.readFileSync(this.appRoot + "/mocks/methods.mock.ts", 'utf8'), ts.ScriptTarget.Latest);
        var walker = new ngCyclomaticComplexityRule_1.Walker(sourceFile);
        walker.walk();
    };
    Main.prototype.processFolder = function () {
        return this;
    };
    Main.prototype.processFiles = function () {
        return this;
    };
    Main.prototype.processFile = function () {
    };
    Main.prototype.processMethods = function () {
        return this;
    };
    Main.prototype.processMethod = function () {
    };
    return Main;
}());
exports.Main = Main;
