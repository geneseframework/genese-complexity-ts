import * as fs from 'fs-extra';
import { TsFolder } from '../models/ts-folder.model';
import { getExtension } from './file.service';
import { TsFileService } from './ts-file.service';
import { TsFolderStats } from '../models/ts-folder-stats.interface';
import { Tools } from './tools.service';
import { TsFile } from '../models/ts-file.model';
import { BarchartService } from './barchart.service';

export class TsFolderService {

    private static _stats: TsFolderStats = undefined;

    constructor() {
    }


    static generate(path: string, extension?: string, folder: TsFolder = new TsFolder()): TsFolder {
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
            TsFolderService.addPercentages();
            // console.log('STATS', TsFolderService._stats);
            return TsFolderService._stats;
        }
    }


    static calculateStats(tsFolder: TsFolder): void {
        TsFolderService._stats.numberOfFiles += tsFolder?.tsFiles?.length ?? 0;
        for (const subFolder of tsFolder.subFolders) {
            for (const file of subFolder.tsFiles) {
                TsFolderService.addFileStats(file);
            }
            TsFolderService.calculateStats(subFolder);
        }
    }


    static addPercentages(): void {
        TsFolderService._stats.percentUnderCognitiveThreshold = Tools.percent(TsFolderService._stats.methodsUnderCognitiveThreshold, TsFolderService._stats.numberOfMethods);
        TsFolderService._stats.percentUnderCyclomaticThreshold = Tools.percent(TsFolderService._stats.methodsUnderCyclomaticThreshold, TsFolderService._stats.numberOfMethods);
    }


    static addFileStats(tsFile: TsFile) {
        if (!tsFile) {
            return TsFolderService._stats;
        }
        let tsFileStats = tsFile.getStats();
        TsFolderService._stats.numberOfMethods += tsFileStats.numberOfMethods;
        TsFolderService._stats.methodsUnderCognitiveThreshold += tsFileStats.methodsUnderCognitiveThreshold;
        TsFolderService._stats.methodsUnderCyclomaticThreshold += tsFileStats.methodsUnderCyclomaticThreshold;
        TsFolderService._stats.barChartCognitive = BarchartService.concat(TsFolderService._stats.barChartCognitive, tsFileStats.barChartCognitive);
        TsFolderService._stats.barChartCyclomatic = BarchartService.concat(TsFolderService._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
    }

}
