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
        this.report = [];
        this.outDir = this.appRoot + "/genese/complexity";
    }
    ReportService.getInstance = function () {
        if (!ReportService.instance) {
            ReportService.instance = new ReportService();
        }
        return ReportService.instance;
    };
    ReportService.prototype.generate = function () {
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
        var ts = this.template({ analyses: this.report });
        fs.writeFileSync(this.outDir + "/report.html", ts, { encoding: 'utf-8' });
        fs.copyFileSync(this.appRoot + "/src/templates/report.css", this.outDir + "/report.css");
        fs.copyFileSync(this.appRoot + "/src/templates/prettify.css", this.outDir + "/prettify.css");
    };
    ReportService.prototype.getReport = function () {
        return this.report;
    };
    ReportService.prototype.addEvaluation = function (evaluation) {
        this.report.push(evaluation);
        console.log('EVALS this.report', this.report);
    };
    return ReportService;
}());
exports.ReportService = ReportService;
