"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fs = require("fs-extra");
var fileWalker_1 = require("./services/fileWalker");
var report_service_1 = require("./services/report.service");
var file_service_1 = require("./services/file.service");
var ast_service_1 = require("./services/ast.service");
var ts_folder_1 = require("./models/ts.folder.model");
var appRootPath = require('app-root-path');
var Main = /** @class */ (function () {
    function Main() {
        this.appRoot = appRootPath.toString(); // Root of the app
        this.path = this.appRoot + "/src/mocks/";
        this.tsFolder = new ts_folder_1.TsFolder();
    }
    Main.prototype.start = function () {
        console.log('START CALCULATION');
        this.getTree()
            .setTsFolder()
            .generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    };
    Main.prototype.getTree = function () {
        var sourceFile = file_service_1.getSourceFile(this.appRoot + "/src/mocks/ast.mock.ts");
        var tree = ast_service_1.Ast.getTree(sourceFile);
        console.log('TREE 0 = ', tree.children[0]);
        return this;
    };
    Main.prototype.setTsFolder = function () {
        return this;
    };
    Main.prototype.evaluateFolder = function (dirPath) {
        var tsFiles = file_service_1.getTypescriptFiles(dirPath);
        console.log('TS FILES', tsFiles);
        for (var _i = 0, tsFiles_1 = tsFiles; _i < tsFiles_1.length; _i++) {
            var file = tsFiles_1[_i];
            this.evaluateFile(file);
        }
        return this;
    };
    Main.prototype.evaluateFile = function (pathFile) {
        var fileName = file_service_1.getFilename(pathFile);
        var sourceFile = ts.createSourceFile(fileName, fs.readFileSync(pathFile, 'utf8'), ts.ScriptTarget.Latest);
        var walker = new fileWalker_1.FileWalkerService(sourceFile);
        walker.walk();
    };
    Main.prototype.generateReportOfTsFolder = function () {
        var reportService = report_service_1.ReportService.getInstance();
        reportService.generate();
    };
    return Main;
}());
exports.Main = Main;
