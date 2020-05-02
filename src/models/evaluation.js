"use strict";
exports.__esModule = true;
var Evaluation = /** @class */ (function () {
    function Evaluation() {
        this.cognitiveValue = 0;
        this.cyclomaticValue = 0;
        this.filename = '';
        this.methodName = '';
    }
    Evaluation.prototype.add = function (evaluation) {
        var newEval = new Evaluation();
        newEval.cognitiveValue = this.cognitiveValue + evaluation.cognitiveValue;
        newEval.cyclomaticValue = this.cyclomaticValue + evaluation.cyclomaticValue;
        return newEval;
    };
    return Evaluation;
}());
exports.Evaluation = Evaluation;
