import * as fs from 'fs-extra';
import { TsFolder } from '../models/ts-folder.model';
import { getExtension } from './file.service';
import { TsFileService } from './ts-file.service';
import { TsFolderStats } from '../models/ts-folder-stats.interface';
import { Tools } from './tools.service';
import { TsFile } from '../models/ts-file.model';
import { BarchartService } from './barchart.service';
import { ComplexityType } from '../enums/complexity-type.enum';
import { TsFileStats } from '../models/ts-file-stats.interface';

export class TsFolderService {

    private static _stats: TsFolderStats = undefined;

    constructor() {
    }


    static generate(path: string, extension?: string, folder: TsFolder = new TsFolder()): TsFolder {
        if (!path) {
            console.log('ERROR: no path.')
            return undefined;
        }
        const tsFolder: TsFolder = new TsFolder();
        tsFolder.path = path;
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach(function(elementName) {
            const pathElement = path + elementName;
            if (fs.statSync(pathElement).isDirectory()) {
                let subFolder = new TsFolder();
                subFolder = TsFolderService.generate(`${pathElement}/`, extension, subFolder);
                subFolder.parent = folder;
                subFolder.path = pathElement;
                tsFolder.subFolders.push(subFolder);
            } else {
                if (!extension || extension === getExtension(pathElement)) {
                    tsFolder.tsFiles.push(TsFileService.generate(pathElement, folder));
                }
            }
        });
        return tsFolder;
    }


    static getStats(tsFolder: TsFolder): TsFolderStats {
        if (TsFolderService._stats) {
            return TsFolderService._stats
        } else {
            TsFolderService._stats = new TsFolderStats();
            TsFolderService.calculateStats(tsFolder);
            TsFolderService._stats.addPercentages();
            TsFolderService.sortBarCharts();
            return TsFolderService._stats;
        }
    }


    static calculateStats(tsFolder: TsFolder): void {
        TsFolderService._stats.numberOfFiles += tsFolder?.tsFiles?.length ?? 0;
        for (const file of tsFolder.tsFiles) {
            TsFolderService.addFileStats(file);
        }
        for (const subFolder of tsFolder.subFolders) {
            TsFolderService.calculateStats(subFolder);
        }

    }


    // static addPercentages(): void {
    //     TsFolderService._stats.percentUnderCognitiveThreshold = Tools.percent(TsFolderService._stats.numberOfMethods - TsFolderService._stats.numberOfMethodsByStatus.cognitive.error, TsFolderService._stats.numberOfMethods);
    //     TsFolderService._stats.percentUnderCyclomaticThreshold = Tools.percent(TsFolderService._stats.numberOfMethods - TsFolderService._stats.numberOfMethodsByStatus.cyclomatic.error, TsFolderService._stats.numberOfMethods);
    // }


    static addFileStats(tsFile: TsFile): void {
        if (!tsFile) {
            return;
        }
        let tsFileStats = tsFile.getStats();
        TsFolderService._stats.numberOfMethods += tsFileStats.numberOfMethods;
        TsFolderService.addMethodsByStatus(ComplexityType.COGNITIVE, tsFileStats);
        TsFolderService.addMethodsByStatus(ComplexityType.CYCLOMATIC, tsFileStats);
        TsFolderService._stats.barChartCognitive = BarchartService.concat(TsFolderService._stats.barChartCognitive, tsFileStats.barChartCognitive);
        TsFolderService._stats.barChartCyclomatic = BarchartService.concat(TsFolderService._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
    }


    static addMethodsByStatus(type: ComplexityType, tsFileStats: TsFileStats): void {
        TsFolderService._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
        TsFolderService._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
        TsFolderService._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    }


    static sortBarCharts() {
        TsFolderService._stats.barChartCognitive = TsFolderService._stats.barChartCognitive.sort();
        TsFolderService._stats.barChartCyclomatic = TsFolderService._stats.barChartCyclomatic.sort();
    }
}
