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

import { Evaluation } from '../../models/evaluation';

export class SecondMock {

    constructor() {}

    questionDotToken(time: any): Evaluation {
        time = time?.name;
        return {cyclomaticValue: 1, cognitiveValue: 0};
    }


    forForFor(max: number): Evaluation {
        let total = 0;
        for (let i = 1; i < max; ++i) {
            for (let j = 2; j < i; ++j) {
                for (let k = 2; k < 10; ++k) {
                    console.log(`k = ${k}`);
                }
            }
            total += i;
        }
        return {cyclomaticValue: 4, cognitiveValue: 6};
    }


    tryCatch(): Evaluation {
        try {
            const a = 1;
        } catch (e) {
            console.log(e);
        }
        return {cyclomaticValue: 2, cognitiveValue: 1};
    }

}
