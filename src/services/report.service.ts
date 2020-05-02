import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { Evaluation } from '../models/evaluation';
import { TsFolder } from '../models/ts-folder';

const appRootPath = require('app-root-path');

export class ReportService {

    private appRoot = appRootPath.toString();                   // Root of the app
    private evaluations: Evaluation[] = [];
    template: HandlebarsTemplateDelegate;
    outDir: string;
    private tsFolder: TsFolder;


    constructor(tsFolder: TsFolder) {
        this.tsFolder = tsFolder;
        this.outDir = `${this.appRoot}/genese/complexity`;
    }


    private addEvaluations(): void {
        for (const subFolder of this.tsFolder.subFolders) {
            for (const tsFile of subFolder.tsFiles) {
                for (const tsMethod of tsFile.tsMethods) {
                    this.evaluations.push(tsMethod.getEvaluation());
                }
            }
        }
    }


    generateReport(): void {
        this.addEvaluations();
        if (fs.existsSync(this.outDir)) {
            fs.emptyDirSync(this.outDir);
        } else {
            fs.mkdirsSync(this.outDir);
        }
        const rowTemplate = eol.auto(fs.readFileSync(`${this.appRoot}/src/templates/row.handlebars`, 'utf-8'));
        Handlebars.registerPartial("analyse", rowTemplate);
        const reportTemplate = eol.auto(fs.readFileSync(`${this.appRoot}/src/templates/report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    private writeReport() {
        const ts = this.template({report: this.evaluations});
        fs.writeFileSync(`${this.outDir}/report.html`, ts, {encoding: 'utf-8'});
        fs.copyFileSync(`${this.appRoot}/src/templates/report.css`, `${this.outDir}/report.css`);
        fs.copyFileSync(`${this.appRoot}/src/templates/prettify.css`, `${this.outDir}/prettify.css`);
    }
}
