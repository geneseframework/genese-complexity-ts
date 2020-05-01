"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FirstMock = /** @class */ (function () {
    function FirstMock() {
    }
    FirstMock.prototype.ifElse = function (data) {
        if (data === 'a') {
            data = 'b';
        }
        else {
            data = 'c';
        }
        return { cyclomaticValue: 2, cognitiveValue: 1 };
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
        return { cyclomaticValue: 3, cognitiveValue: 1 };
    };
    return FirstMock;
}());
