"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fs = require("fs-extra");
var fileWalker_1 = require("./features/fileWalker");
var report_service_1 = require("./features/report.service");
var file_service_1 = require("./features/file.service");
var appRootPath = require('app-root-path');
var Main = /** @class */ (function () {
    function Main() {
        this.appRoot = appRootPath.toString(); // Root of the app
    }
    Main.prototype.process = function () {
        console.log('START CALCULATION');
        this.evaluateFolder(this.appRoot + "/src/mocks/");
        this.evaluateFile(this.appRoot + "/src/mocks/first.mock.ts");
        this.generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    };
    Main.prototype.evaluateFolder = function (path) {
        var allFiles = file_service_1.getAllFiles(path);
        console.log('ALL FILES', allFiles);
    };
    Main.prototype.evaluateFile = function (pathFile) {
        var fileName = file_service_1.getFileName(pathFile);
        var sourceFile = ts.createSourceFile(fileName, fs.readFileSync(pathFile, 'utf8'), ts.ScriptTarget.Latest);
        var walker = new fileWalker_1.FileWalker(sourceFile);
        walker.walk();
    };
    Main.prototype.generateReport = function () {
        var reportService = report_service_1.ReportService.getInstance();
        reportService.generate();
    };
    return Main;
}());
exports.Main = Main;
