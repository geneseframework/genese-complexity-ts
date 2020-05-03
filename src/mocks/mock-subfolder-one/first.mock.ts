import { EvaluationValues } from '../../interfaces/evaluation-values';

class FirstMock {

    constructor() {
    }



    ifElse(data): EvaluationValues {
        if (data === 'a') {
            data = 'b';
        } else {
            data = 'c';
        }
        return {cyclomaticValue: 2, cognitiveValue: 1};
    }


    ifAnd(a, b): EvaluationValues {
        if (a && b) {
            console.log(a);
        }
        return {cyclomaticValue: 3, cognitiveValue: 2};
    }


    ifOr(a, b): EvaluationValues {
        if (a || b) {
            console.log(a);
        }
        return {cyclomaticValue: 3, cognitiveValue: 2};
    }


    ifAndAnd(a, b, c): EvaluationValues {
        if (a && b && c) {
            console.log(a);
        }
        return {cyclomaticValue: 4, cognitiveValue: 2};
    }


    ifAndOr(a, b, c): EvaluationValues {
        if (a && b || c) {
            console.log(a);
        }
        return {cyclomaticValue: 4, cognitiveValue: 3};
    }

    ifIfIf(data: number): EvaluationValues {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
            }
        }
        return {cyclomaticValue: 4, cognitiveValue: 6};
    }



    ifIfIfElse(data: number): EvaluationValues {
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


    ifAndAndOrAnd(a, b, c, d, e, f): EvaluationValues {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
        return {cyclomaticValue: 7, cognitiveValue: 4};
    }



    switches(numberOfWords: number): EvaluationValues {
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
