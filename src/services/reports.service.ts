import * as fs from 'fs-extra';
import { TsFolder } from '../models/ts-folder.model';
import { Options } from '../models/options';
import { TsFolderReportService } from './ts-folder-report.service';

const appRoot = require('app-root-path').toString();

export class ReportsService {

    static generateAllReports(tsFolder: TsFolder): void {
        ReportsService.createCssFiles();
        const parentFolder: TsFolder = new TsFolder();
        parentFolder.subFolders.push(tsFolder);
        ReportsService.generateSubfoldersReports(tsFolder);
    }


    private static generateSubfoldersReports(tsFolder: TsFolder): void{
        ReportsService.generateFolderReport(tsFolder);
        for (const subFolder of tsFolder.subFolders) {
        }
    }


    private static generateFolderReport(tsFolder: TsFolder): void {
        const folderReportService = new TsFolderReportService(tsFolder);
        folderReportService.generateReport();
    }


    private static createCssFiles(): void {
        fs.copyFileSync(`${appRoot}/src/templates/report.css`, `${Options.outDir}/report.css`);
        fs.copyFileSync(`${appRoot}/src/templates/styles.css`, `${Options.outDir}/styles.css`);
        fs.copyFileSync(`${appRoot}/src/templates/prettify.css`, `${Options.outDir}/prettify.css`);
    }
}
