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
        const text = eol.auto(fs.readFileSync(`${this.appRoot}/src/templates/report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(text);

        this.writeReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }

    private writeReport() {
        const ts = this.template({score: 'aaa'});
        fs.writeFileSync(`${this.outDir}/report.html`, ts, {encoding: 'utf-8'});
        fs.copyFileSync(`${this.appRoot}/src/templates/report.css`, `${this.outDir}/report.css`);
        fs.copyFileSync(`${this.appRoot}/src/templates/prettify.css`, `${this.outDir}/prettify.css`);
    }
}
