"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fse = require("fs-extra");
var walker_1 = require("./features/walker");
var report_service_1 = require("./features/report.service");
var file_service_1 = require("./features/file.service");
var appRootPath = require('app-root-path');
var Main = /** @class */ (function () {
    function Main() {
        this.appRoot = appRootPath.toString(); // Root of the app
    }
    Main.prototype.process = function () {
        this.evaluateFile(this.appRoot + "/src/mocks/methods.mock.ts");
        this.generateReport();
    };
    Main.prototype.evaluateFile = function (pathFile) {
        var fileName = file_service_1.getFileName(pathFile);
        console.log('FILE NAME fileName ', fileName);
        var sourceFile = ts.createSourceFile(fileName, fse.readFileSync(pathFile, 'utf8'), ts.ScriptTarget.Latest);
        var walker = new walker_1.Walker(sourceFile);
        walker.walk();
    };
    Main.prototype.generateReport = function () {
        var reportService = report_service_1.ReportService.getInstance();
        reportService.generate();
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
