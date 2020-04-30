"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FirstMock = /** @class */ (function () {
    function FirstMock() {
    }
    FirstMock.prototype.forForFor = function (max) {
        var total = 0;
        for (var i = 1; i < max; ++i) {
            for (var j = 2; j < i; ++j) {
                for (var k = 2; k < 10; ++k) {
                    console.log("k = " + k);
                }
            }
            total += i;
        }
        return { cyclomaticValue: 4, cognitiveValue: 6 };
    };
    FirstMock.prototype.ifIfIf = function (data) {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
            }
        }
        return { cyclomaticValue: 4, cognitiveValue: 6 };
    };
    FirstMock.prototype.ifIfIfElse = function (data) {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
                else {
                    console.log('data <= 4');
                }
            }
        }
        return { cyclomaticValue: 4, cognitiveValue: 6 };
    };
    FirstMock.prototype.ifAnd = function (a, b) {
        if (a && b) {
            console.log(a);
        }
    };
    FirstMock.prototype.ifOr = function (a, b) {
        if (a || b) {
            console.log(a);
        }
    };
    FirstMock.prototype.ifAndAnd = function (a, b, c) {
        if (a && b && c) {
            console.log(a);
        }
    };
    FirstMock.prototype.ifAndOr = function (a, b, c) {
        if (a && b || c) {
            console.log(a);
        }
    };
    FirstMock.prototype.switches = function (numberOfWords) {
        switch (numberOfWords) {
            case 1:
                return "one";
            case 2:
                return "a couple";
            default:
                return "lots";
        }
    };
    return FirstMock;
}());
