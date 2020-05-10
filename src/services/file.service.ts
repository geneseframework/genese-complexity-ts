import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { Options } from '../models/options';

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
    const pathWithoutEndSlash = path.charAt(path.length - 1) === `/` ? path.slice(0, path.length - 1) : path;
    return pathRoot === pathWithoutEndSlash.slice(0, pathRoot.length) ? pathWithoutEndSlash.slice(pathRoot.length + 1, pathWithoutEndSlash.length) : pathWithoutEndSlash;
}


export function getExtension(filename: string): string {
    return filename.split('.').pop();
}


export function createRelativeDir(relativePath: string): void {
    const path = `${Options.outDir}/${relativePath}`;
    if (fs.existsSync(path)) {
        fs.emptyDirSync(path);
    } else {
        fs.mkdirsSync(path);
    }
}


export function createOutDir(): void {
    if (fs.existsSync(Options.outDir)) {
        fs.emptyDirSync(Options.outDir);
    } else {
        fs.mkdirsSync(Options.outDir);
    }
}


export function copyFile(originPath: string, targetPath: string): void {
    fs.copyFileSync(originPath, targetPath);
}
