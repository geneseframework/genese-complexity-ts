"use strict";
exports.__esModule = true;
var fs = require("fs-extra");
var eol = require("eol");
var Handlebars = require("handlebars");
var appRootPath = require('app-root-path');
/**
 * Main generator class
 */
var ReportService = /** @class */ (function () {
    function ReportService() {
        this.appRoot = appRootPath.toString(); // Root of the app
        this.outDir = this.appRoot + "/genese/complexity";
    }
    ReportService.prototype.generate = function () {
        console.log('GENERATE');
        if (fs.existsSync(this.outDir)) {
            fs.emptyDirSync(this.outDir);
        }
        else {
            fs.mkdirsSync(this.outDir);
        }
        var rowTemplate = eol.auto(fs.readFileSync(this.appRoot + "/src/templates/row.handlebars", 'utf-8'));
        Handlebars.registerPartial("analyse", rowTemplate);
        var reportTemplate = eol.auto(fs.readFileSync(this.appRoot + "/src/templates/report.handlebars", 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    };
    ReportService.prototype.writeReport = function () {
        var ts = this.template({ score: 'aaa', analyses: [{ filename: 'zzz' }] });
        fs.writeFileSync(this.outDir + "/report.html", ts, { encoding: 'utf-8' });
        fs.copyFileSync(this.appRoot + "/src/templates/report.css", this.outDir + "/report.css");
        fs.copyFileSync(this.appRoot + "/src/templates/prettify.css", this.outDir + "/prettify.css");
    };
    return ReportService;
}());
exports.ReportService = ReportService;
