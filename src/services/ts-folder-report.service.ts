import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { TsFolder } from '../models/ts-folder.model';
import { Options } from '../models/options';
import { RowFolderReport } from '../models/row-folder-report.model';
import { RowFileReport } from '../models/row-file-report.model';
import { createRelativeDir, getRootReportsFromSubfolder } from './file.service';

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
        let report: RowFolderReport[] = [];
        for (const subFolder of tsFolder.subFolders) {
            const subFolderReport: RowFolderReport = {
                path: subFolder.relativePath,
                numberOfFiles: subFolder.numberOfFiles,
                numberOfMethods: subFolder.numberOfMethods,
                complexitiesByStatus: subFolder.complexitiesByStatus
            };
            report.push(subFolderReport);
            report = report.concat(this.getFoldersArray(subFolder));
        }
        return report;
    }


    getFilesArray(tsFolder: TsFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
        // for (const subFolder of tsFolder.subFolders) {
        //     for (const tsFile of subFolder.tsFiles) {
        for (const tsFile of tsFolder.tsFiles) {
            for (const tsMethod of tsFile.tsMethods) {
                report.push({
                    cognitiveValue: tsMethod.cognitiveValue,
                    cyclomaticValue: tsMethod.cyclomaticValue,
                    filename: tsFile.name,
                    methodName: tsMethod.name
                })
            }
            // }
            // report = report.concat(this.getFilesArray(subFolder));
        }
        return report;
    }


    generateReport(): void {
        const parentFolder: TsFolder = new TsFolder();
        parentFolder.subFolders.push(this.tsFolder);
        this.foldersArray = this.getFoldersArray(parentFolder);
        this.filesArray = this.getFilesArray(this.tsFolder);
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
            relativeRootReports: getRootReportsFromSubfolder(this.tsFolder.relativePath),
            stats: this.tsFolder.getStats(),
            thresholds: Options.getThresholds()
        });
        createRelativeDir(this.tsFolder.relativePath);
        const pathReport = `${Options.outDir}/${this.tsFolder.relativePath}/report.html`;
        fs.writeFileSync(pathReport, template, {encoding: 'utf-8'});
    }


    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${appRoot}/src/templates/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
