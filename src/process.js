"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_folder_model_1 = require("./models/ts-folder.model");
var ts_folder_service_1 = require("./services/ts-folder.service");
var ts_file_service_1 = require("./services/ts-file.service");
var options_1 = require("./models/options");
var reports_service_1 = require("./services/reports.service");
var file_service_1 = require("./services/file.service");
var appRootPath = require('app-root-path');
var appRoot = appRootPath.toString();
var Process = /** @class */ (function () {
    function Process() {
        this.tsFolder = new ts_folder_model_1.TsFolder();
    }
    Process.prototype.start = function () {
        console.log('START CALCULATION');
        // this.getDebugReport();
        this.setOptions()
            .createOutDir()
            .generateTree()
            .generateReports();
        console.log('REPORT GENERATED SUCCESSFULLY');
    };
    Process.prototype.setOptions = function () {
        options_1.Options.setOptions();
        return this;
    };
    Process.prototype.createOutDir = function () {
        file_service_1.createOutDir();
        return this;
    };
    Process.prototype.getDebugReport = function () {
        var tsFile = ts_file_service_1.TsFileService.generateTree(appRoot + "/src/mocks/ast.mock.ts");
        // for (const method of tsFile.tsMethods) {
        //     const tree = method.tsTree;
        // tree.printAllChildren();
        // }
    };
    Process.prototype.generateTree = function () {
        this.tsFolder = ts_folder_service_1.TsFolderService.generateTree(options_1.Options.pathFolderToAnalyse, 'ts');
        return this;
    };
    Process.prototype.generateReports = function () {
        reports_service_1.ReportsService.generateAllReports(this.tsFolder);
    };
    return Process;
}());
exports.Process = Process;
