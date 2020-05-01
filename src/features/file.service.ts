import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { TsFolder } from '../models/ts-folder';
import { TsFile } from '../models/ts-file';

export function getFilename(filePath = ''): string {
    const splittedPath = filePath.split('/');
    return splittedPath[splittedPath.length - 1];
}

export function getSourceFile(path: string): ts.SourceFile {
    console.log('GET SOURCE FILE filename', getFilename(path));
    return ts.createSourceFile(getFilename(path), fs.readFileSync(path, 'utf-8'), ts.ScriptTarget.Latest);
}

export function getAllFiles(dirPath: string, arrayOfFiles?: string[]): string[] {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(`${dirPath}/${file}`);
        }
    })
    return arrayOfFiles;
}


export function createTsFolder(path: string, extension?: string, folder: TsFolder = new TsFolder()): TsFolder {
    const tsFolder: TsFolder = new TsFolder();
    const filesOrDirs = fs.readdirSync(path);
    console.log('FILE OR DIRS', filesOrDirs);
    filesOrDirs.forEach(function(elementName) {
        const pathElement = path + elementName;
        console.log('FILE OR DIRS pathElement', pathElement);
        if (fs.statSync(pathElement).isDirectory()) {
            const subFolder = new TsFolder();
            subFolder.parent = folder;
            subFolder.path = pathElement;
            tsFolder.subFolders.push(subFolder);
            createTsFolder(`${pathElement}/`, extension, subFolder);
        } else {
            if (!extension || extension === getExtension(pathElement)) {
                tsFolder.tsFiles.push(createTsFile(pathElement, folder));
            }
        }
    });
    return tsFolder;
}


export function createTsFile(path: string, tsFolder: TsFolder = new TsFolder()): TsFile {
    const tsFile: TsFile = new TsFile();
    tsFile.sourceFile = getSourceFile(path);
    tsFile.tsFolder = tsFolder;
    tsFile.setName();
    return tsFile;
}


export function getTypescriptFiles(dirPath: string) {
    return getAllFiles(dirPath).filter(e => getExtension(e) === 'ts');
}


export function getExtension(filename: string): string {
    return filename.split('.').pop();
}
