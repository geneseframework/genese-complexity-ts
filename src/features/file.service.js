"use strict";
exports.__esModule = true;
function getFileName(filePath) {
    if (filePath === void 0) { filePath = ''; }
    var splittedPath = filePath.split('/');
    return splittedPath[splittedPath.length - 1];
}
exports.getFileName = getFileName;
