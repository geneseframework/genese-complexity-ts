"use strict";
exports.__esModule = true;
var fs = require("fs-extra");
var path = require("path");
function getFileName(filePath) {
    if (filePath === void 0) { filePath = ''; }
    var splittedPath = filePath.split('/');
    return splittedPath[splittedPath.length - 1];
}
exports.getFileName = getFileName;
function getAllFiles(dirPath, arrayOfFiles) {
    var files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        }
        else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
        }
    });
    return arrayOfFiles;
}
exports.getAllFiles = getAllFiles;
