import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { Evaluation } from '../models/evaluation.model';
import { TsFolder } from '../models/ts.folder.model';
import { Options } from '../models/options';
import { TsFolderService } from './ts-folder.service';

const appRoot = require('app-root-path').toString();

export class TsFolderReportService {

    private evaluations: Evaluation[] = [];
    template: HandlebarsTemplateDelegate;
    tsFolder: TsFolder = undefined;


    constructor(tsFolder: TsFolder) {
        this.tsFolder = tsFolder;
    }


    getEvaluations(tsFolder: TsFolder): Evaluation[] {
        let evaluations: Evaluation[] = [];
        for (const subFolder of tsFolder.subFolders) {
            for (const tsFile of subFolder.tsFiles) {
                for (const tsMethod of tsFile.tsMethods) {
                    evaluations.push(tsMethod.getEvaluation());
                }
            }
            evaluations = evaluations.concat(this.getEvaluations(subFolder));
        }
        return evaluations;
    }


    generateReport(): void {
        this.evaluations = this.getEvaluations(this.tsFolder);
        const rowTemplate = eol.auto(fs.readFileSync(`${appRoot}/src/templates/row.handlebars`, 'utf-8'));
        Handlebars.registerPartial("analyse", rowTemplate);
        const reportTemplate = eol.auto(fs.readFileSync(`${appRoot}/src/templates/report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    private writeReport() {
        const ts = this.template({
            numberOfFiles: this.tsFolder.getNumberOfFiles(),
            report: this.evaluations
        });
        fs.writeFileSync(`${Options.outDir}/report.html`, ts, {encoding: 'utf-8'});
        fs.copyFileSync(`${appRoot}/src/templates/report.css`, `${Options.outDir}/report.css`);
        fs.copyFileSync(`${appRoot}/src/templates/styles.css`, `${Options.outDir}/styles.css`);
        fs.copyFileSync(`${appRoot}/src/templates/prettify.css`, `${Options.outDir}/prettify.css`);
    }
}