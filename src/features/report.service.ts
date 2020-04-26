import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";

const appRootPath = require('app-root-path');

/**
 * Main generator class
 */
export class ReportService {

    private appRoot = appRootPath.toString();                   // Root of the app
    template: HandlebarsTemplateDelegate;
    outDir: string;

    constructor() {
        this.outDir = `${this.appRoot}/genese/complexity`;
    }


    generate(): void {
        console.log('GENERATE');
        if (fs.existsSync(this.outDir)) {
            fs.emptyDirSync(this.outDir);
        } else {
            fs.mkdirsSync(this.outDir);
        }
        const rowTemplate = eol.auto(fs.readFileSync(`${this.appRoot}/src/templates/row.handlebars`, 'utf-8'));
        Handlebars.registerPartial(
            "analyse",
        rowTemplate);
        const reportTemplate = eol.auto(fs.readFileSync(`${this.appRoot}/src/templates/report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);

        this.writeReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }

    private writeReport() {
        const ts = this.template({score: 'aaa', analyses: [{filename: 'zzz'}]});
        fs.writeFileSync(`${this.outDir}/report.html`, ts, {encoding: 'utf-8'});
        fs.copyFileSync(`${this.appRoot}/src/templates/report.css`, `${this.outDir}/report.css`);
        fs.copyFileSync(`${this.appRoot}/src/templates/prettify.css`, `${this.outDir}/prettify.css`);
    }
}
