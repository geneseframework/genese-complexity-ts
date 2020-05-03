import * as fs from 'fs-extra';
import { TsFolder } from '../models/ts.folder.model';
import { getExtension } from './file.service';
import { TsFileService } from './ts-file.service';
import { TsFolderStats } from '../models/ts-folder-stats.model';

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


    static getStats(tsFolder: TsFolder): TsFolderStats {
        let nbFiles = tsFolder?.tsFiles?.length ?? 0;
        let nbMethods = 0;
        for (const subFolder of tsFolder.subFolders) {
            for (const file of subFolder.tsFiles) {
                nbMethods += file.tsMethods?.length ?? 0;
            }
            nbFiles += TsFolderService.getStats(subFolder)?.numberOfFiles;
        }
        const stats: TsFolderStats = {
            numberOfFiles: nbFiles,
            numberOfMethods: nbMethods
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
