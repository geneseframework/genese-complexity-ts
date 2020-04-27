
import * as fs from 'fs-extra';
const path = require("path")

export function getFilename(filePath = ''): string {
    const splittedPath = filePath.split('/');
    return splittedPath[splittedPath.length - 1];
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


export function getTsFiles(dirPath: string) {
    return getAllFiles(dirPath).filter(e => getExtension(e) === 'ts');
}


export function getExtension(filename: string): string {
    return filename.split('.').pop();
}