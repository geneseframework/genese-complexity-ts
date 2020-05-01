"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fs = require("fs-extra");
var fileWalker_1 = require("./features/fileWalker");
var report_service_1 = require("./features/report.service");
var file_service_1 = require("./features/file.service");
var ast_service_1 = require("./features/ast.service");
var appRootPath = require('app-root-path');
var Main = /** @class */ (function () {
    function Main() {
        this.appRoot = appRootPath.toString(); // Root of the app
    }
    Main.prototype.process = function () {
        console.log('START CALCULATION');
        this.parseNodes();
        // this.evaluateFolder(`${this.appRoot}/src/mocks/`);
        // // this.evaluateFile(`${this.appRoot}/src/mocks/first.mock.ts`);
        // this.generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    };
    Main.prototype.parseNodes = function () {
        var sourceFile = file_service_1.getSourceFile(this.appRoot + "/src/mocks/ast.mock.ts");
        var nodes = ast_service_1.Ast.parseChildNodes(sourceFile, function (childNode) {
            var name = ast_service_1.Ast.getSyntaxKindName(childNode);
            console.log('CHILD KIND ', childNode.kind, ' / ', name);
        });
        console.log('PARSE NODES LENGTH', nodes.length);
        var children = sourceFile.getChildren();
        console.log('PARSE NODES children LENGTH', children.length);
        var childrenCount = sourceFile.getChildCount();
        console.log('PARSE NODES childrenCount', childrenCount);
    };
    Main.prototype.evaluateFolder = function (dirPath) {
        var tsFiles = file_service_1.getTsFiles(dirPath);
        console.log('TS FILES', tsFiles);
        for (var _i = 0, tsFiles_1 = tsFiles; _i < tsFiles_1.length; _i++) {
            var file = tsFiles_1[_i];
            this.evaluateFile(file);
        }
    };
    Main.prototype.evaluateFile = function (pathFile) {
        var fileName = file_service_1.getFilename(pathFile);
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
