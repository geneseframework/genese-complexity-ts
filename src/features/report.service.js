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
        this.outDir = this.appRoot + "/report";
    }
    /**
     * Actually generates the files
     */
    ReportService.prototype.generate = function () {
        console.log('GENERATE');
        if (fs.existsSync(this.outDir)) {
            fs.emptyDirSync(this.outDir);
        }
        else {
            fs.mkdirsSync(this.outDir);
        }
        var text = eol.auto(fs.readFileSync(this.appRoot + "/src/templates/report.handlebars", 'utf-8'));
        var compiled = Handlebars.compile(text);
        this.template = compiled;
        this.writeReport();
        console.log('FINISHED SUCCESSFULLY');
    };
    ReportService.prototype.writeReport = function () {
        var ts = this.template({ score: 'zzz' });
        fs.writeFileSync(this.outDir + "/report.html", ts, { encoding: 'utf-8' });
    };
    return ReportService;
}());
exports.ReportService = ReportService;
