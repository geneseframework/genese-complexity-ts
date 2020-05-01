"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
function getFilename(filePath) {
    if (filePath === void 0) { filePath = ''; }
    var splittedPath = filePath.split('/');
    return splittedPath[splittedPath.length - 1];
}
exports.getFilename = getFilename;
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
function getTsFiles(dirPath) {
    return getAllFiles(dirPath).filter(function (e) { return getExtension(e) === 'ts'; });
}
exports.getTsFiles = getTsFiles;
function getExtension(filename) {
    return filename.split('.').pop();
}
exports.getExtension = getExtension;
