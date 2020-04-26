"use strict";
exports.__esModule = true;
var ts = require("typescript");
var typescript_1 = require("typescript");
var utils = require("tsutils");
var complexity_service_1 = require("./complexity.service");
/**
 * Walker of the rule
 * Browse the sourceFile and calculates cognitive complexity for each method
 */
var Walker = /** @class */ (function () {
    function Walker(sourceFile, options) {
        this.sourceFile = sourceFile;
    }
    Walker.prototype.walk = function () {
        var threshold = 3;
        // const threshold: number = this.options?. as any;
        Object.assign(this.sourceFile, { depthLevel: 1 });
        var cb = function (node) {
            var _a;
            if (node.kind === typescript_1.SyntaxKind.MethodDeclaration && ((_a = node === null || node === void 0 ? void 0 : node['name']) === null || _a === void 0 ? void 0 : _a['escapedText']) === 'sumOfPrimes') {
                var method = node;
                var cc = calculateCognitiveComplexityOfMethod(node);
                if (cc > threshold) {
                    var error = "\r\nMethod " + method.name['escapedText'] + " : cognitive complexity = " + cc + " (threshold = " + threshold + ")";
                    console.log('FAILURE ', error);
                    // this.addFailureAt(node.getStart(), node.getWidth(), error);
                }
                else {
                    // TODO : output results in a report file
                }
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
