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


export function getSubFolders(path: string, folder: TsFolder = new TsFolder()): TsFolder[] {
    const tsFolders: TsFolder[] = [];
    const filesOrDirs = fs.readdirSync(path);
    console.log('FILE OR DIRS', filesOrDirs);
    filesOrDirs.forEach(function(elementName) {
        const pathElement = path + elementName;
        console.log('FILE OR DIRS pathElement', pathElement);
        if (fs.statSync(pathElement).isDirectory()) {
            console.log('IS DIR fs.statSync()');
            const subFolder = new TsFolder();
            subFolder.parent = folder;
            subFolder.path = pathElement;
            folder.subFolders.push(subFolder);
            getSubFolders(`${pathElement}/`, subFolder);
        } else {
            console.log('IS NOT DIR fs.statSync()');
            folder.tsFiles.push(createTsFile(pathElement, folder));
        }
    });
    return tsFolders;
}


export function createTsFile(path: string, tsFolder: TsFolder = new TsFolder()): TsFile {
    console.log('CREATE TS FILE path', path);
    const tsFile: TsFile = new TsFile();
    tsFile.sourceFile = getSourceFile(path);
    tsFile.tsFolder = tsFolder;
    console.log('CREATE TS FILE tsFile', tsFile);
    return tsFile;
}


export function getTypescriptFiles(dirPath: string) {
    return getAllFiles(dirPath).filter(e => getExtension(e) === 'ts');
}


export function getExtension(filename: string): string {
    return filename.split('.').pop();
}
