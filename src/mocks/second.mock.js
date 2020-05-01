"use strict";
/*
 * @file utils.service.ts
 *
 * Copyright (c) Naval Group SA property, 2020[-2020], all rights reserved.
 *
 * Copyright (c) All rights reserved. Both the content and the form of this software are the property of Naval Group SA
 * and/or of third party. It is formally prohibited to use, copy, modify, translate, disclose or perform all or part of
 * this software without obtaining Naval Group SA’s prior written consent or authorization. Any such unauthorized use,
 * copying, modification, translation, disclosure or performance by any means whatsoever shall constitute
 * an infringement punishable by criminal or civil law and, more generally, a breach of Naval Group SA’s rights.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var SecondMock = /** @class */ (function () {
    function SecondMock() {
    }
    SecondMock.prototype.questionDotToken = function (time) {
        time = time === null || time === void 0 ? void 0 : time.name;
        return { cyclomaticValue: 1, cognitiveValue: 0 };
    };
    SecondMock.prototype.forForFor = function (max) {
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
    SecondMock.prototype.tryCatch = function () {
        try {
            var a = 1;
        }
        catch (e) {
            console.log(e);
        }
        return { cyclomaticValue: 2, cognitiveValue: 1 };
    };
    return SecondMock;
}());
exports.SecondMock = SecondMock;
