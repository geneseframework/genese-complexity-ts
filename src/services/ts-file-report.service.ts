import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { Options } from '../models/options';
import { RowFileReport } from '../models/row-file-report.model';
import { createRelativeDir, getExtension, getRouteBetweenPaths, getRouteToRoot } from './file.service';
import { TsFile } from '../models/ts-file.model';
import { MethodReport } from '../models/method-report.model';

const appRoot = require('app-root-path').toString();

export class TsFileReportService {

    private methods: MethodReport[] = [];
    private relativeRootReports = '';
    template: HandlebarsTemplateDelegate;
    tsFile: TsFile = undefined;


    constructor(tsFile: TsFile) {
        this.tsFile = tsFile;
    }


    getMethodsArray(): MethodReport[] {
        let report: MethodReport[] = [];
        for (const method of this.tsFile.tsMethods) {
            const methodReport: MethodReport = {
                methodName: method.name,
                cognitiveColor: method.cognitiveStatus.toLowerCase(),
                cognitiveValue: method.cognitiveValue,
                cyclomaticColor: method.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: method.cyclomaticValue,
            };
            report.push(methodReport);
        }
        return report;
    }


    generateReport(): void {
        this.methods = this.getMethodsArray();
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("method", 'method');
        const reportTemplate = eol.auto(fs.readFileSync(`${appRoot}/src/templates/handlebars/report-file.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    private writeReport() {
        const template = this.template({
            colors: Options.colors,
            methods: this.methods,
            relativeRootReports: this.relativeRootReports,
            stats: this.tsFile.getStats(),
            thresholds: Options.getThresholds()
        });
        const extensionLength = getExtension(this.tsFile.name).length;
        const filenameWithoutExtension = this.tsFile.name.slice(0, -(extensionLength + 1));
        console.log('FNWE', filenameWithoutExtension);
        // console.log('FNWE', this.tsFile.tsFolder);
        const pathReport = `${Options.outDir}/${this.tsFile.tsFolder?.relativePath}/${filenameWithoutExtension}.html`;
        fs.writeFileSync(pathReport, template, {encoding: 'utf-8'});
    }


    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${appRoot}/src/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
