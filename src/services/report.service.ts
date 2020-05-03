import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { Evaluation } from '../models/evaluation.model';
import { TsFolder } from '../models/ts.folder.model';
import { Options } from '../models/options';

const appRoot = require('app-root-path').toString();

export class ReportService {

    private evaluations: Evaluation[] = [];
    template: HandlebarsTemplateDelegate;


    constructor() {
    }


    getEvaluationsOfTsFolder(tsFolder: TsFolder): Evaluation[] {
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


    generateReportOfTsFolder(tsFolder: TsFolder): void {
        const evaluations = this.getEvaluationsOfTsFolder(tsFolder);
        const rowTemplate = eol.auto(fs.readFileSync(`${appRoot}/src/templates/row.handlebars`, 'utf-8'));
        Handlebars.registerPartial("analyse", rowTemplate);
        const reportTemplate = eol.auto(fs.readFileSync(`${appRoot}/src/templates/report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport(evaluations);
    }


    private writeReport(evaluations: Evaluation[]) {
        const ts = this.template({report: evaluations});
        fs.writeFileSync(`${Options.outDir}/report.html`, ts, {encoding: 'utf-8'});
        fs.copyFileSync(`${appRoot}/src/templates/report.css`, `${Options.outDir}/report.css`);
        fs.copyFileSync(`${appRoot}/src/templates/styles.css`, `${Options.outDir}/styles.css`);
        fs.copyFileSync(`${appRoot}/src/templates/prettify.css`, `${Options.outDir}/prettify.css`);
    }
}
