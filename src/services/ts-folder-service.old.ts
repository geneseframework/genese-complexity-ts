import * as fs from 'fs-extra';
import { TsFolder } from '../models/ts-folder.model';
import { getExtension } from './file.service';
import { TsFileService } from './ts-file.service';
import { TsFolderStats } from '../models/ts-folder-stats.interface';
import { Tools } from './tools.service';
import { Point } from '../models/point.model';
import { TsFile } from '../models/ts-file.model';
import { TsFileStats } from '../models/ts-file-stats.interface';

export class TsFolderService {


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


    static addFileStats(tsFolderStats: TsFolderStats = new TsFolderStats(), tsFile: TsFile): TsFolderStats {
        if (!tsFile) {
            return tsFolderStats;
        }
        let tsFileStats = tsFile.getStats();
        let folderStats = tsFolderStats;
        folderStats.numberOfMethods += tsFileStats.numberOfMethods;
        folderStats.methodsUnderCognitiveThreshold += tsFileStats.methodsUnderCognitiveThreshold;
        folderStats.methodsUnderCyclomaticThreshold += tsFileStats.methodsUnderCyclomaticThreshold;
        folderStats.methodsByCognitiveCpx = folderStats.methodsByCognitiveCpx.concat(tsFileStats.methodsByCognitiveCpx);
        folderStats.methodsByCyclomaticCpx = folderStats.methodsByCyclomaticCpx.concat(tsFileStats.methodsByCyclomaticCpx);
        return folderStats;
    }


    static addFolderStats(tsFolderStats: TsFolderStats = new TsFolderStats(), folderStats: TsFolderStats): TsFolderStats {
        console.log('ADD FOLDER STATS')
        if (!folderStats) {
            return tsFolderStats;
        }
        tsFolderStats.numberOfMethods += folderStats.numberOfMethods;
        tsFolderStats.methodsUnderCognitiveThreshold += folderStats.methodsUnderCognitiveThreshold ?? 0;
        tsFolderStats.methodsUnderCyclomaticThreshold += folderStats.methodsUnderCyclomaticThreshold ?? 0;
        tsFolderStats.methodsByCognitiveCpx = tsFolderStats.methodsByCognitiveCpx.concat(folderStats.methodsByCognitiveCpx);
        tsFolderStats.methodsByCyclomaticCpx = tsFolderStats.methodsByCyclomaticCpx.concat(folderStats.methodsByCyclomaticCpx);
        console.log('NB FILES', tsFolderStats.numberOfFiles);
        return tsFolderStats;
    }

    // private static getArrayStats(): TsFolderStats[] {
    //
    // }


    static getStats(tsFolder: TsFolder, isSubfolder = false): TsFolderStats {
        let folder: TsFolder;
        if (!isSubfolder) {
            folder = new TsFolder();
            folder.subFolders = [tsFolder];
        } else {
            folder = tsFolder;
        }
        // TsFolderService.getArrayStats()
        let tsFolderStats: TsFolderStats = new TsFolderStats();
        // tsFolderStats.numberOfFiles = tsFolder?.tsFiles?.length ?? 0;
        // let nbMethods = 0;
        // let methodsUnderCognitiveThreshold = 0;
        // let methodsUnderCyclomaticThreshold = 0;
        // let methodsByCognitiveCpx: Point[] = [];
        // let methodsByCyclomaticCpx: Point[] = [];
        console.log('FIRST TS FOLDER STATS', tsFolderStats.numberOfFiles);
        console.log('SUBFOLDERS', folder.subFolders.length);
        for (const subFolder of folder.subFolders) {
            for (const file of subFolder.tsFiles) {
                console.log('filename', file.sourceFile.fileName);
                console.log('OLD TS FOLDER STATS', tsFolderStats.numberOfFiles);
                tsFolderStats = this.addFileStats(tsFolderStats, file);
                tsFolderStats.numberOfFiles ++;
                console.log('NEW TS FOLDER STATS', tsFolderStats.numberOfFiles);
                // nbMethods += file.tsMethods?.length ?? 0;
                // methodsUnderCognitiveThreshold += file.getStats().methodsUnderCognitiveThreshold;
                // methodsUnderCyclomaticThreshold += file.getStats().methodsUnderCyclomaticThreshold;
            }
            const statsSubFolder = this.getStats(subFolder, true);
            console.log('STATS SUBFOLDER', statsSubFolder.numberOfFiles)
            // tsFolderStats = this.addFolderStats(tsFolderStats, statsSubFolder);
            // console.log('STATS FINISHED TS FOLDER', statsSubFolder.numberOfFiles)
        }
        tsFolderStats.methodsUnderCognitiveThreshold = Tools.percent(tsFolderStats.methodsUnderCognitiveThreshold, tsFolderStats.numberOfMethods);
        tsFolderStats.methodsUnderCyclomaticThreshold = Tools.percent(tsFolderStats.methodsUnderCyclomaticThreshold, tsFolderStats.numberOfMethods);
        // const stats: TsFolderStats = {
        //     methodsUnderCognitiveThreshold: methodsUnderCognitiveThreshold,
        //     methodsUnderCyclomaticThreshold: methodsUnderCyclomaticThreshold,
        //     numberOfFiles: nbFiles,
        //     numberOfMethods: nbMethods,
        //     percentUnderCognitiveThreshold: Tools.percent(methodsUnderCognitiveThreshold, nbMethods),
        //     percentUnderCyclomaticThreshold: Tools.percent(methodsUnderCyclomaticThreshold, nbMethods)
        // }
        console.log('TS FOLDER STATS', tsFolderStats)
        return tsFolderStats;
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
