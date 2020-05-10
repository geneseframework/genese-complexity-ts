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


export function getRelativePath(pathRoot: string, path: string): string {
    if (!path || !pathRoot) {
        return '';
    }
    const pathWithoutEndSlash = path.charAt(path.length - 1) === `/` ? path.slice(0, path.length - 1) : path;
    return pathRoot === pathWithoutEndSlash.slice(0, pathRoot.length) ? pathWithoutEndSlash.slice(pathRoot.length + 1, pathWithoutEndSlash.length) : pathWithoutEndSlash;
}


export function getRouteToRoot(relativePath: string): string {
    if (!relativePath) {
        return '';
    }
    let relativeRoot = '/..';
    for (let i = 0; i < relativePath.length; i++) {
        relativeRoot = relativePath.charAt(i) === '/' ? `/..${relativeRoot}` : relativeRoot;
    }
    return relativeRoot.slice(1);
}


export function getRouteBetweenPaths(pathSource: string, pathTarget: string): string {
    if (!pathSource || !pathTarget) {
        return '';
    }
    let commonRoute = '';
    for (let i = 0; i < pathSource.length; i++) {
        if (pathSource.charAt(i) === pathTarget.charAt(i)) {
            commonRoute = `${commonRoute}${pathSource.charAt(i)}`
        } else {
            break;
        }
    }
    const backToCommonRoute = getRouteToRoot(pathSource.slice(commonRoute.length)) || '.';
    return `${backToCommonRoute}${pathTarget.slice(commonRoute.length)}`;
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
