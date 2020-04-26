"use strict";
exports.__esModule = true;
var ts = require("typescript");
var typescript_1 = require("typescript");
var complexity_service_1 = require("./complexity.service");
var report_service_1 = require("./report.service");
/**
 * Browse the sourceFile and calculates cognitive and cyclomatic complexities for each method
 */
var FileWalker = /** @class */ (function () {
    function FileWalker(sourceFile) {
        this.reportService = report_service_1.ReportService.getInstance();
        this.sourceFile = sourceFile;
    }
    FileWalker.prototype.walk = function () {
        var _this = this;
        Object.assign(this.sourceFile, { depthLevel: 1 });
        var cb = function (node) {
            var _a;
            if (node.kind === typescript_1.SyntaxKind.MethodDeclaration) {
                var cognitiveValue = complexity_service_1.calculateCognitiveComplexityOfMethod(node);
                var cyclomaticValue = complexity_service_1.calculateCyclomaticComplexityOfMethod(node);
                var evaluation = {
                    filename: _this.sourceFile.fileName,
                    methodName: (_a = node === null || node === void 0 ? void 0 : node['name']) === null || _a === void 0 ? void 0 : _a['escapedText'],
                    cognitiveValue: cognitiveValue,
                    cyclomaticValue: cyclomaticValue
                };
                _this.reportService.addEvaluation(evaluation);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(this.sourceFile, cb);
    };
    return FileWalker;
}());
exports.FileWalker = FileWalker;
