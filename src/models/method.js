"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var utils = require("tsutils");
var complexity_service_1 = require("../features/complexity.service");
var Method = /** @class */ (function () {
    function Method(node) {
        this.node = undefined;
        this._cognitiveComplexity = 0;
        this.currentDepth = 0;
        this.cyclomaticComplexity = 0;
        this.node = node;
        this.calculateCognitiveComplexity(node);
    }
    Object.defineProperty(Method.prototype, "cognitiveComplexity", {
        get: function () {
            return this._cognitiveComplexity;
        },
        enumerable: true,
        configurable: true
    });
    Method.prototype.calculateCognitiveComplexity = function (ctx) {
        var complexity = 0;
        var depthLevel = 0;
        ts.forEachChild(ctx, function cb(node) {
            if (utils.isFunctionWithBody(node)) {
                depthLevel++;
                complexity += depthLevel;
                ts.forEachChild(node, cb);
            }
            else {
                if (complexity_service_1.increasesComplexity(node, 'cognitive')) {
                    depthLevel++;
                    complexity += depthLevel;
                }
                ts.forEachChild(node, cb);
            }
        });
        this._cognitiveComplexity = complexity;
    };
    return Method;
}());
exports.Method = Method;
