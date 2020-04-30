import { Evaluation } from '../models/evaluation';

class FirstMock {

    constructor() {
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


    ifIfIf(data: number): Evaluation {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
            }
        }
        return {cyclomaticValue: 4, cognitiveValue: 6};
    }



    ifIfIfElse(data: number): Evaluation {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                } else {
                    console.log('data <= 4');
                }
            }
        }
        return {cyclomaticValue: 4, cognitiveValue: 6};
    }


    ifAnd(a, b): Evaluation {
        if (a && b) {
            console.log(a);
        }
        return {cyclomaticValue: 3, cognitiveValue: 2};
    }


    ifOr(a, b): Evaluation {
        if (a || b) {
            console.log(a);
        }
        return {cyclomaticValue: 3, cognitiveValue: 2};
    }


    ifAndAnd(a, b, c): Evaluation {
        if (a && b && c) {
            console.log(a);
        }
        return {cyclomaticValue: 4, cognitiveValue: 2};
    }


    ifAndOr(a, b, c): Evaluation {
        if (a && b || c) {
            console.log(a);
        }
        return {cyclomaticValue: 4, cognitiveValue: 3};
    }


    ifAndAndOrAnd(a, b, c, d, e, f): Evaluation {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
        return {cyclomaticValue: 7, cognitiveValue: 4};
    }



    switches(numberOfWords: number): Evaluation {
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
        return {cyclomaticValue: 4, cognitiveValue: 6};
    }
}
