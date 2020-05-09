import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { TsFolder } from '../models/ts-folder.model';
import { Options } from '../models/options';
import { RowFolderReport } from '../models/row-folder-report.model';
import { RowFileReport } from '../models/row-file-report.model';

const appRoot = require('app-root-path').toString();

export class TsFolderReportService {

    private filesArray: RowFileReport[] = [];
    private foldersArray: RowFolderReport[] = [];
    template: HandlebarsTemplateDelegate;
    tsFolder: TsFolder = undefined;


    constructor(tsFolder: TsFolder) {
        this.tsFolder = tsFolder;
    }


    getFoldersArray(tsFolder: TsFolder): RowFolderReport[] {
        let evaluations: RowFolderReport[] = [];
        for (const subFolder of tsFolder.subFolders) {
            for (const tsFile of subFolder.tsFiles) {
                for (const tsMethod of tsFile.tsMethods) {
                }
            }
        }
        return evaluations;
    }


    getFilesArray(tsFolder: TsFolder): RowFileReport[] {
        const report: RowFileReport[] = [];
        for (const subFolder of tsFolder.subFolders) {
            for (const tsFile of subFolder.tsFiles) {
                for (const tsMethod of tsFile.tsMethods) {
                    report.push({
                        cognitiveValue: tsMethod.cognitiveValue,
                        cyclomaticValue: tsMethod.cyclomaticValue,
                        filename: tsFile.name,
                        methodName: tsMethod.name
                    })
                }
            }
        }
        return report;
    }


    generateReport(): void {
        const parentFolder: TsFolder = new TsFolder();
        parentFolder.subFolders.push(this.tsFolder);
        this.foldersArray = this.getFoldersArray(parentFolder);
        this.filesArray = this.getFilesArray(parentFolder);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
        const reportTemplate = eol.auto(fs.readFileSync(`${appRoot}/src/templates/report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    private writeReport() {
        const template = this.template({
            colors: Options.colors,
            filesArray: this.filesArray,
            foldersArray: this.foldersArray,
            stats: this.tsFolder.getStats(),
            thresholds: Options.getThresholds()
        });
        fs.writeFileSync(`${Options.outDir}/report.html`, template, {encoding: 'utf-8'});
        fs.copyFileSync(`${appRoot}/src/templates/report.css`, `${Options.outDir}/report.css`);
        fs.copyFileSync(`${appRoot}/src/templates/styles.css`, `${Options.outDir}/styles.css`);
        fs.copyFileSync(`${appRoot}/src/templates/prettify.css`, `${Options.outDir}/prettify.css`);
    }


    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${appRoot}/src/templates/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
