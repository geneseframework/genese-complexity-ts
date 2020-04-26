"use strict";
exports.__esModule = true;
var ts = require("typescript");
var typescript_1 = require("typescript");
var utils = require("tsutils");
var complexity_service_1 = require("./complexity.service");
var report_service_1 = require("./report.service");
/**
 * Walker of the rule
 * Browse the sourceFile and calculates cognitive complexity for each method
 */
var Walker = /** @class */ (function () {
    function Walker(sourceFile, options) {
        this.reportService = report_service_1.ReportService.getInstance();
        this.sourceFile = sourceFile;
    }
    Walker.prototype.walk = function () {
        var _this = this;
        var threshold = 3;
        // const threshold: number = this.options?. as any;
        Object.assign(this.sourceFile, { depthLevel: 1 });
        var cb = function (node) {
            var _a;
            if (node.kind === typescript_1.SyntaxKind.MethodDeclaration) {
                var method = node;
                var cognitiveValue = calculateCognitiveComplexityOfMethod(node);
                var cyclomaticValue = calculateCyclomaticComplexityOfMethod(node);
                var evaluation = {
                    filename: 'Mock',
                    methodName: (_a = node === null || node === void 0 ? void 0 : node['name']) === null || _a === void 0 ? void 0 : _a['escapedText'],
                    cognitiveValue: cognitiveValue,
                    cyclomaticValue: cyclomaticValue
                };
                _this.reportService.addEvaluation(evaluation);
                console.log('COGNITIVE cognitiveValue', cognitiveValue);
                console.log('CYCLOMATIC cyclomaticValue', cyclomaticValue);
                console.log('ZZZ this.reportService.getReport', _this.reportService.getReport());
                // if (cognitiveValue > threshold) {
                //     const error = `\r\nMethod ${method.name['escapedText']} : cognitive complexity = ${cognitiveValue} (threshold = ${threshold})`;
                //     console.log('FAILURE ', error);
                // this.addFailureAt(node.getStart(), node.getWidth(), error);
                // } else {
                // TODO : output results in a report file
                // }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(this.sourceFile, cb);
    };
    return Walker;
}());
exports.Walker = Walker;
/**
 * Calculates the cognitive complexity of a method
 * @param ctx: ts.Node
 */
function calculateCognitiveComplexityOfMethod(ctx) {
    var complexity = 1;
    var depthLevel = 0;
    ts.forEachChild(ctx, function cb(node) {
        if (utils.isFunctionWithBody(node)) {
            depthLevel++;
            complexity += depthLevel;
            ts.forEachChild(node, cb);
        }
        else {
            if (complexity_service_1.increasesComplexity(node)) {
                depthLevel++;
                complexity += depthLevel;
            }
            ts.forEachChild(node, cb);
        }
    });
    return complexity;
}
exports.calculateCognitiveComplexityOfMethod = calculateCognitiveComplexityOfMethod;
/**
 * Calculates the cyclomatic complexity of a method
 * @param ctx: ts.Node
 */
function calculateCyclomaticComplexityOfMethod(ctx) {
    var totalComplexity = 1;
    ts.forEachChild(ctx, function cb(node) {
        if (utils.isFunctionWithBody(node)) {
            totalComplexity += 1;
            ts.forEachChild(node, cb);
        }
        else {
            if (complexity_service_1.increasesComplexity(node)) {
                totalComplexity += 1;
            }
            ts.forEachChild(node, cb);
        }
    });
    return totalComplexity;
}
exports.calculateCyclomaticComplexityOfMethod = calculateCyclomaticComplexityOfMethod;
