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


    private getEvaluations(): void {
        const tsFolder: TsFolder = new TsFolder();
        tsFolder.subFolders.push(this.tsFolder);
        this.evaluations = this.getEvaluationsOfTsFolder(tsFolder);
    }

    private getEvaluationsOfTsFolder(tsFolder: TsFolder): Evaluation[] {
        let evaluations: Evaluation[] = [];
        for (const subFolder of tsFolder.subFolders) {
            for (const tsFile of subFolder.tsFiles) {
                for (const tsMethod of tsFile.tsMethods) {
                    evaluations.push(tsMethod.getEvaluation());
                }
            }
            evaluations = evaluations.concat(this.getEvaluationsOfTsFolder(subFolder));
        }
        return evaluations;
    }


    generateReport(): void {
        this.getEvaluations();
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
        fs.copyFileSync(`${this.appRoot}/src/templates/styles.css`, `${this.outDir}/styles.css`);
        fs.copyFileSync(`${this.appRoot}/src/templates/prettify.css`, `${this.outDir}/prettify.css`);
    }
}
