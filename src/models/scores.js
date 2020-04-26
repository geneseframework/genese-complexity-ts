"use strict";
exports.__esModule = true;
var Scores = /** @class */ (function () {
    function Scores() {
        this._cognitiveScore = 0;
        this._cyclomaticScore = 0;
        this._fileName = '';
        this._methodName = '';
    }
    Scores.prototype.getcognitiveScore = function () {
        return this._cognitiveScore;
    };
    Scores.prototype.getcyclomaticScore = function () {
        return this._cyclomaticScore;
    };
    Scores.prototype.getfileName = function () {
        return this._fileName;
    };
    Scores.prototype.getmethodName = function () {
        return this._methodName;
    };
    return Scores;
}());
exports.Scores = Scores;
