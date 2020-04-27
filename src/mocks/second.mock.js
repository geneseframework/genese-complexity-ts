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
exports.__esModule = true;
var SecondMock = /** @class */ (function () {
    function SecondMock() {
    }
    SecondMock.prototype.questionDotToken = function (time) {
        time = time === null || time === void 0 ? void 0 : time.name;
    };
    SecondMock.prototype.ifElse = function (data) {
        if (data === 'a') {
            data = 'b';
        }
        else {
            data = 'c';
        }
    };
    SecondMock.prototype.tryCatch = function () {
        try {
            var a = 1;
        }
        catch (e) {
            console.log(e);
        }
    };
    return SecondMock;
}());
exports.SecondMock = SecondMock;