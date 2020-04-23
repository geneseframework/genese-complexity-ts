"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var utils = require("tsutils");
var typescript_1 = require("typescript");
var complexity_service_1 = require("./complexity.service");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var _a, _b;
        var threshold = (_b = (_a = this.getOptions()) === null || _a === void 0 ? void 0 : _a.ruleArguments) === null || _b === void 0 ? void 0 : _b[0];
        if (threshold) {
            return this.applyWithWalker(new NgCognitiveComplexityWalker(sourceFile, 'ng-cognitive-complexity', threshold));
        }
        else {
            console.log('WARNING : ng-cognitive-complexity is not correctly implemented. The correct format is like [true, 5]');
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
/**
 * Walker of the rule
 * Browse the sourceFile and calculates cognitive complexity for each method
 */
var NgCognitiveComplexityWalker = /** @class */ (function (_super) {
    __extends(NgCognitiveComplexityWalker, _super);
    function NgCognitiveComplexityWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgCognitiveComplexityWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var threshold = this.options;
        Object.assign(sourceFile, { depthLevel: 1 });
        var cb = function (node) {
            var _a;
            if (node.kind === typescript_1.SyntaxKind.MethodDeclaration && ((_a = node === null || node === void 0 ? void 0 : node['name']) === null || _a === void 0 ? void 0 : _a['escapedText']) === 'sumOfPrimes') {
                var method = node;
                var cc = calculateCognitiveComplexityOfMethod(node);
                if (cc > threshold) {
                    var error = "\r\nMethod " + method.name['escapedText'] + " : cognitive complexity = " + cc + " (threshold = " + threshold + ")";
                    _this.addFailureAt(node.getStart(), node.getWidth(), error);
                }
                else {
                    // TODO : output results in a report file
                    // console.log(`Cyclomatic complexity method ${method.name['escapedText']} = ${cc} (OK)`);
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    return NgCognitiveComplexityWalker;
}(Lint.AbstractWalker));
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
