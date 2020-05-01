"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fs = require("fs-extra");
var ts_folder_1 = require("../models/ts-folder");
var ts_file_1 = require("../models/ts-file");
function getFilename(filePath) {
    if (filePath === void 0) { filePath = ''; }
    var splittedPath = filePath.split('/');
    return splittedPath[splittedPath.length - 1];
}
exports.getFilename = getFilename;
function getSourceFile(path) {
    console.log('GET SOURCE FILE filename', getFilename(path));
    return ts.createSourceFile(getFilename(path), fs.readFileSync(path, 'utf-8'), ts.ScriptTarget.Latest);
}
exports.getSourceFile = getSourceFile;
function getAllFiles(dirPath, arrayOfFiles) {
    var files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        }
        else {
            arrayOfFiles.push(dirPath + "/" + file);
        }
    });
    return arrayOfFiles;
}
exports.getAllFiles = getAllFiles;
function getSubFolders(path, folder) {
    if (folder === void 0) { folder = new ts_folder_1.TsFolder(); }
    var tsFolders = [];
    var filesOrDirs = fs.readdirSync(path);
    console.log('FILE OR DIRS', filesOrDirs);
    filesOrDirs.forEach(function (elementName) {
        var pathElement = path + elementName;
        console.log('FILE OR DIRS pathElement', pathElement);
        if (fs.statSync(pathElement).isDirectory()) {
            console.log('IS DIR fs.statSync()');
            var subFolder = new ts_folder_1.TsFolder();
            subFolder.parent = folder;
            subFolder.path = pathElement;
            folder.subFolders.push(subFolder);
            getSubFolders(pathElement + "/", subFolder);
        }
        else {
            console.log('IS NOT DIR fs.statSync()');
            folder.tsFiles.push(createTsFile(pathElement, folder));
        }
    });
    return tsFolders;
}
exports.getSubFolders = getSubFolders;
function createTsFile(path, tsFolder) {
    if (tsFolder === void 0) { tsFolder = new ts_folder_1.TsFolder(); }
    console.log('CREATE TS FILE path', path);
    var tsFile = new ts_file_1.TsFile();
    tsFile.sourceFile = getSourceFile(path);
    tsFile.tsFolder = tsFolder;
    console.log('CREATE TS FILE tsFile', tsFile);
    return tsFile;
}
exports.createTsFile = createTsFile;
function getTypescriptFiles(dirPath) {
    return getAllFiles(dirPath).filter(function (e) { return getExtension(e) === 'ts'; });
}
exports.getTypescriptFiles = getTypescriptFiles;
function getExtension(filename) {
    return filename.split('.').pop();
}
exports.getExtension = getExtension;
