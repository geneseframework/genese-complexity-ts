import * as ts from 'typescript';
import * as fs from 'fs-extra';

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


export function getTypescriptFiles(dirPath: string): string[] {
    return getAllFiles(dirPath).filter(e => getExtension(e) === 'ts');
}


export function getRelativePath(pathRoot: string, path: string): string {
    if (!path || !pathRoot) {
        return '';
    }
    return pathRoot === path.slice(0, pathRoot.length) ? path.slice(pathRoot.length + 1) : path;
}


export function getExtension(filename: string): string {
    return filename.split('.').pop();
}
