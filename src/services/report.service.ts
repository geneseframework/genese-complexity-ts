import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { Evaluation } from '../models/evaluation';

const appRootPath = require('app-root-path');

export class ReportService {

    private appRoot = appRootPath.toString();                   // Root of the app
    private report: Evaluation[] = [];
    private static instance: ReportService;
    template: HandlebarsTemplateDelegate;
    outDir: string;


    private constructor() {
        this.outDir = `${this.appRoot}/genese/complexity`;
    }


    static getInstance(): ReportService {
        if (!ReportService.instance) {
            ReportService.instance = new ReportService();
        }
        return ReportService.instance;
    }


    generate(): void {
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
        const ts = this.template({report: this.report});
        fs.writeFileSync(`${this.outDir}/report.html`, ts, {encoding: 'utf-8'});
        fs.copyFileSync(`${this.appRoot}/src/templates/report.css`, `${this.outDir}/report.css`);
        fs.copyFileSync(`${this.appRoot}/src/templates/prettify.css`, `${this.outDir}/prettify.css`);
    }


    addEvaluation(evaluation: Evaluation): void {
        this.report.push(evaluation);
    }
}
