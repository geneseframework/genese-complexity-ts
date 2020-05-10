import { TsFolder } from '../models/ts-folder.model';
import { Options } from '../models/options';
import { TsFolderReportService } from './ts-folder-report.service';
import { copyFile, createRelativeDir } from './file.service';

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
            ReportsService.generateSubfoldersReports(subFolder);
        }
    }


    private static generateFolderReport(tsFolder: TsFolder): void {
        const folderReportService = new TsFolderReportService(tsFolder);
        folderReportService.generateReport();
    }


    private static createCssFiles(): void {
        createRelativeDir('styles');
        copyFile(`${appRoot}/src/templates/styles/report.css`, `${Options.outDir}/styles/report.css`);
        copyFile(`${appRoot}/src/templates/styles/styles.css`, `${Options.outDir}/styles/styles.css`);
        copyFile(`${appRoot}/src/templates/styles/prettify.css`, `${Options.outDir}/styles/prettify.css`);
    }
}
