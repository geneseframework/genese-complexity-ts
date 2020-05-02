import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { TsFolder } from '../models/ts-folder';
import { getExtension } from './file.service';
import { TsFile } from '../models/ts-file';
import { TsFileService } from './ts-file.service';

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
                    console.log('FILE path ', pathElement);
                    tsFolder.tsFiles.push(TsFileService.generate(pathElement, folder));
                }
            }
        });
        return tsFolder;
    }
}
