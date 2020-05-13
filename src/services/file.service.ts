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
    if (!path || !pathRoot || path === pathRoot) {
        return '';
    }
    // console.log('GET RLP pathRoot', pathRoot)
    // console.log('GET RLP path', path)
    const pathWithoutEndSlash = path.charAt(path.length - 1) === `/` ? path.slice(0, path.length - 1) : path;
    // console.log('GET RLP pathWithoutEndSlash', pathWithoutEndSlash)
    const slice = pathWithoutEndSlash.slice(0, pathRoot.length);
    // console.log('SLICEEE', slice)
    const  relpath =pathRoot === pathWithoutEndSlash.slice(0, pathRoot.length) ? pathWithoutEndSlash.slice(pathRoot.length, pathWithoutEndSlash.length) : pathWithoutEndSlash;
    // console.log('REELPTH', relpath)
    // throw new Error()
    return relpath;
}


export function getRouteToRoot(relativePath: string): string {
    if (!relativePath) {
        return '.';
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
    return filename ? filename.split('.').pop() : '';
}


export function getFilenameWithoutExtension(filename: string): string {
    if (!filename) {
        return '';
    }
    const extensionLength = getExtension(filename).length;
    return filename.slice(0, -(extensionLength + 1));
}


export function createRelativeDir(relativePath: string): void {
    const path = `${Options.pathReports}/${relativePath}`;
    if (fs.existsSync(path)) {
        fs.emptyDirSync(path);
    } else {
        fs.mkdirsSync(path);
    }
}


export function createOutDir(): void {
    if (fs.existsSync(Options.pathReports)) {
        fs.emptyDirSync(Options.pathReports);
    } else {
        fs.mkdirsSync(Options.pathReports);
    }
}


export function copyFile(originPath: string, targetPath: string): void {
    fs.copyFileSync(originPath, targetPath);
}
