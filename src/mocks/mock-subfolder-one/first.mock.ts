import { Evaluation } from '../../models/evaluation';

class FirstMock {

    constructor() {
    }



    ifElse(data): Evaluation {
        if (data === 'a') {
            data = 'b';
        } else {
            data = 'c';
        }
        return {cyclomaticValue: 2, cognitiveValue: 1};
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
        return {cyclomaticValue: 3, cognitiveValue: 1};
    }
}
