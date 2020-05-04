import * as fs from 'fs-extra';
import { TsFolder } from '../models/ts-folder.model';
import { getExtension } from './file.service';
import { TsFileService } from './ts-file.service';
import { TsFolderStats } from '../models/ts-folder-stats.interface';
import { Tools } from './tools.service';
import { Point } from '../models/point.model';

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


    static getNumberOfFiles(tsFolder: TsFolder): number {
        let nbFiles = tsFolder?.tsFiles?.length ?? 0;
        for (const subFolder of tsFolder.subFolders) {
            nbFiles += TsFolderService.getNumberOfFiles(subFolder);
        }
        return nbFiles;
    }


    static getStats(tsFolder: TsFolder): TsFolderStats {
        if (TsFolderService._stats) {
            return TsFolderService._stats
        } else {
            TsFolderService._stats = new TsFolderStats();
            return TsFolderService.calculateStats(tsFolder);
        }
    }


    static calculateStats(tsFolder: TsFolder): TsFolderStats {
        // console.log('TSFOLDER', tsFolder)
        let nbFiles = tsFolder?.tsFiles?.length ?? 0;
        let nbMethods = 0;
        let methodsUnderCognitiveThreshold = 0;
        let methodsUnderCyclomaticThreshold = 0;
        let methodsByCognitiveCpx: Point[] = [];
        let methodsByCyclomaticCpx: Point[] = [];
        for (const subFolder of tsFolder.subFolders) {
            for (const file of subFolder.tsFiles) {
                nbMethods += file.tsMethods?.length ?? 0;
                methodsUnderCognitiveThreshold += file.getStats().methodsUnderCognitiveThreshold;
                methodsUnderCyclomaticThreshold += file.getStats().methodsUnderCyclomaticThreshold;
            }
            nbFiles += TsFolderService.calculateStats(subFolder)?.numberOfFiles;
        }
        const stats: TsFolderStats = {
            methodsUnderCognitiveThreshold: methodsUnderCognitiveThreshold,
            methodsUnderCyclomaticThreshold: methodsUnderCyclomaticThreshold,
            numberOfFiles: nbFiles,
            numberOfMethods: nbMethods,
            percentUnderCognitiveThreshold: Tools.percent(methodsUnderCognitiveThreshold, nbMethods),
            percentUnderCyclomaticThreshold: Tools.percent(methodsUnderCyclomaticThreshold, nbMethods)
        }
        return stats;
    }


    static getNumberOfMethods(tsFolder: TsFolder): number {
        let nbMethods = 0;
        for (const subFolder of tsFolder.subFolders) {
            for (const file of subFolder.tsFiles) {
                nbMethods += file.tsMethods?.length ?? 0;
            }
            TsFolderService.getNumberOfMethods(subFolder);
        }
        return nbMethods;
    }
}
