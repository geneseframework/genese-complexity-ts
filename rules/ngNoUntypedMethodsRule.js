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
var typescript_1 = require("typescript");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NgNoUntypedMethodsWalker(sourceFile, 'ng-no-untyped-methods', void this.getOptions()));
    };
    Rule.FAILURE_STRING = 'Method not typed';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NgNoUntypedMethodsWalker = /** @class */ (function (_super) {
    __extends(NgNoUntypedMethodsWalker, _super);
    function NgNoUntypedMethodsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgNoUntypedMethodsWalker.isTypedMethod = function (node) {
        return Boolean(node.type !== undefined);
    };
    NgNoUntypedMethodsWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (node.kind === typescript_1.SyntaxKind.MethodDeclaration) {
                if (!NgNoUntypedMethodsWalker.isTypedMethod(node)) {
                    _this.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING);
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    return NgNoUntypedMethodsWalker;
}(Lint.AbstractWalker));
