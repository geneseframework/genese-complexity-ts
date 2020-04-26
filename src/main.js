"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fse = require("fs-extra");
var walker_1 = require("./features/walker");
var report_service_1 = require("./features/report.service");
var appRootPath = require('app-root-path');
var Main = /** @class */ (function () {
    function Main() {
        this.appRoot = appRootPath.toString(); // Root of the app
    }
    Main.prototype.process = function () {
        console.log("appRoot " + this.appRoot);
        var reportService = new report_service_1.ReportService();
        reportService.generate();
        var sourceFile = ts.createSourceFile('methods.mock.ts', fse.readFileSync(this.appRoot + "/src/mocks/methods.mock.ts", 'utf8'), ts.ScriptTarget.Latest);
        // this.reportTemplate = Handlebars.compile(fse.readFileSync(`${this.appRoot}/src/mocks/methods.mock.ts`, 'utf8'));
        // console.log('template ', this.reportTemplate);
        // this.reportTemplate({score: 'zzz'});
        var walker = new walker_1.Walker(sourceFile);
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
