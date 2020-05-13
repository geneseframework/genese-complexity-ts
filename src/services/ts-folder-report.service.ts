import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { TsFolder } from '../models/ts-folder.model';
import { Options } from '../models/options';
import { RowFolderReport } from '../models/row-folder-report.model';
import { RowFileReport } from '../models/row-file-report.model';
import {
    createRelativeDir,
    getFilenameWithoutExtension,
    getRouteBetweenPaths,
    getRouteToRoot
} from './file.service';
import { TsFile } from '../models/ts-file.model';
import { MethodReport } from '../models/method-report.model';

const appRoot = require('app-root-path').toString();

export class TsFolderReportService {

    private filesArray: RowFileReport[] = [];
    private foldersArray: RowFolderReport[] = [];
    private methodsArray: RowFileReport[] = [];
    private relativeRootReports = '';
    template: HandlebarsTemplateDelegate;
    tsFolder: TsFolder = undefined;


    constructor(tsFolder: TsFolder) {
        this.tsFolder = tsFolder;
    }


    getFoldersArray(tsFolder: TsFolder): RowFolderReport[] {
        let report: RowFolderReport[] = [];
        if (this.tsFolder.path !== Options.pathFolderToAnalyse) {
            report.push(this.addRowBackToPreviousFolder());
        }
        return report.concat(this.getSubfoldersArray(tsFolder));
    }


    getSubfoldersArray(tsFolder: TsFolder, isSubfolder = false): RowFolderReport[] {
        let report: RowFolderReport[] = [];
        for (const subFolder of tsFolder.subFolders) {
            const subFolderReport: RowFolderReport = {
                complexitiesByStatus: subFolder.getStats().numberOfMethodsByStatus,
                numberOfFiles: subFolder.getStats().numberOfFiles,
                numberOfMethods: subFolder.getStats().numberOfMethods,
                path: subFolder.relativePath,
                routeFromCurrentFolder: this.tsFolder.relativePath === subFolder.relativePath ? undefined : getRouteBetweenPaths(this.tsFolder.relativePath, subFolder.relativePath)
            };
            report.push(subFolderReport);
            // if (!isSubfolder) {
                report = report.concat(this.getSubfoldersArray(subFolder, true));
            // }
        }
        return report;
    }


    addRowBackToPreviousFolder(): RowFolderReport {
        return {
            complexitiesByStatus: undefined,
            numberOfFiles: undefined,
            numberOfMethods: undefined,
            path: '../',
            routeFromCurrentFolder: '..'

        };
    }


    getFilesArray(tsFolder: TsFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
        for (const tsFile of tsFolder.tsFiles) {
            for (const tsMethod of tsFile.tsMethods) {
                report.push({
                    cognitiveColor: tsMethod.cognitiveStatus.toLowerCase(),
                    cognitiveValue: tsMethod.cognitiveValue,
                    cyclomaticColor: tsMethod.cyclomaticStatus.toLowerCase(),
                    cyclomaticValue: tsMethod.cyclomaticValue,
                    filename: tsFile.name,
                    linkFile: this.getFileLink(tsFile, false),
                    methodName: tsMethod.name
                })
            }
        }
        return report;
    }


    getMethodsArraySortedByDecreasingCognitiveCpx(tsFolder: TsFolder): RowFileReport[] {
        const report = this.getMethodsArray(tsFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    }


    getMethodsArray(tsFolder: TsFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
        for (const subFolder of tsFolder.subFolders) {
            for (const tsFile of subFolder.tsFiles) {
                for (const tsMethod of tsFile.tsMethods) {
                    report.push({
                        cognitiveColor: tsMethod.cognitiveStatus.toLowerCase(),
                        cognitiveValue: tsMethod.cognitiveValue,
                        cyclomaticColor: tsMethod.cyclomaticStatus.toLowerCase(),
                        cyclomaticValue: tsMethod.cyclomaticValue,
                        filename: tsFile.name,
                        linkFile: this.getFileLink(tsFile, true),
                        methodName: tsMethod.name
                    })
                }
            }
            report = report.concat(this.getMethodsArray(subFolder));
        }
        return report;
    }


    sortByDecreasingCognitiveCpx(methodsReport: MethodReport[]): MethodReport[] {
        return methodsReport.sort((a, b) => b.cognitiveValue - a.cognitiveValue);
    }


    getFileLink(tsFile: TsFile, isMethodsArray: boolean): string {
        if (this.tsFolder.relativePath === tsFile.tsFolder?.relativePath && isMethodsArray) {
            return `./${getFilenameWithoutExtension(tsFile.name)}.html`;
        }
        const route = getRouteBetweenPaths(this.tsFolder.relativePath, tsFile.tsFolder?.relativePath);
        return `${route}/${getFilenameWithoutExtension(tsFile.name)}.html`;
    }


    generateReport(): void {
        const parentFolder: TsFolder = new TsFolder();
        parentFolder.subFolders.push(this.tsFolder);
        this.relativeRootReports = getRouteToRoot(this.tsFolder.relativePath);
        // console.log('RELROUTE tsFolder.relativePath', this.tsFolder.relativePath);
        this.filesArray = this.getFilesArray(this.tsFolder);
        this.foldersArray = this.getFoldersArray(parentFolder);
        this.methodsArray = this.getMethodsArraySortedByDecreasingCognitiveCpx(parentFolder);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
        const reportTemplate = eol.auto(fs.readFileSync(`${appRoot}/src/templates/handlebars/folder-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    private writeReport() {
        console.log('FOLDERS ARRR', this.foldersArray)
        const template = this.template({
            colors: Options.colors,
            filesArray: this.filesArray,
            foldersArray: this.foldersArray,
            methodsArray: this.methodsArray,
            relativeRootReports: this.relativeRootReports,
            stats: this.tsFolder.getStats(),
            thresholds: Options.getThresholds()
        });
        if (this.tsFolder.relativePath) {
            createRelativeDir(this.tsFolder.relativePath);
        }
        const pathReport = `${Options.pathReports}/${this.tsFolder.relativePath}/folder-report.html`;
        fs.writeFileSync(pathReport, template, {encoding: 'utf-8'});
    }


    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${appRoot}/src/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
