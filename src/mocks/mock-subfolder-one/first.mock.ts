import { EvaluationValuesInterface } from '../../interfaces/evaluation-values.interface';

class FirstMock {

    constructor() {
    }



    ifElse(data): EvaluationValuesInterface {
        if (data === 'a') {
            data = 'b';
        } else {
            data = 'c';
        }
        return {cyclomaticValue: 2, cognitiveValue: 1};
    }


    ifAnd(a, b): EvaluationValuesInterface {
        if (a && b) {
            console.log(a);
        }
        return {cyclomaticValue: 3, cognitiveValue: 2};
    }


    ifOr(a, b): EvaluationValuesInterface {
        if (a || b) {
            console.log(a);
        }
        return {cyclomaticValue: 3, cognitiveValue: 2};
    }


    ifAndAnd(a, b, c): EvaluationValuesInterface {
        if (a && b && c) {
            console.log(a);
        }
        return {cyclomaticValue: 4, cognitiveValue: 2};
    }


    ifAndOr(a, b, c): EvaluationValuesInterface {
        if (a && b || c) {
            console.log(a);
        }
        return {cyclomaticValue: 4, cognitiveValue: 3};
    }


    ifAndAndOrAnd(a, b, c, d, e, f): EvaluationValuesInterface {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
        return {cyclomaticValue: 7, cognitiveValue: 4};
    }


    ifAndAndOrAndAndOrOr(a, b, c, d, e, f): EvaluationValuesInterface {
        if (a && b && c || d && e && f || a || b) {
            console.log(a);
        }
        return {cyclomaticValue: 9, cognitiveValue: 5};
    }


    ifIfIf(data: number): EvaluationValuesInterface {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
            }
        }
        return {cyclomaticValue: 4, cognitiveValue: 6};
    }



    ifIfIfElse(data: number): EvaluationValuesInterface {
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



    switches(numberOfWords: number): EvaluationValuesInterface {
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
