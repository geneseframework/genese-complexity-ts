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
        return { cyclomaticValue: 3, cognitiveValue: 2 };
    };
    FirstMock.prototype.ifOr = function (a, b) {
        if (a || b) {
            console.log(a);
        }
        return { cyclomaticValue: 3, cognitiveValue: 2 };
    };
    FirstMock.prototype.ifAndAnd = function (a, b, c) {
        if (a && b && c) {
            console.log(a);
        }
        return { cyclomaticValue: 4, cognitiveValue: 2 };
    };
    FirstMock.prototype.ifAndOr = function (a, b, c) {
        if (a && b || c) {
            console.log(a);
        }
        return { cyclomaticValue: 4, cognitiveValue: 3 };
    };
    FirstMock.prototype.ifAndAndOrAnd = function (a, b, c, d, e, f) {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
        return { cyclomaticValue: 7, cognitiveValue: 4 };
    };
    FirstMock.prototype.switches = function (numberOfWords) {
        switch (numberOfWords) {
            case 1:
                console.log("one");
                break;
            case 2:
                console.log("a couple");
                break;
            default:
                console.log("lots");
        }
        return { cyclomaticValue: 4, cognitiveValue: 6 };
    };
    return FirstMock;
}());
