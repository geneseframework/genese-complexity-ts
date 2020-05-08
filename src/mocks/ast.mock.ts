import { EvaluationValuesInterface } from '../interfaces/evaluation-values.interface';

export class AstMock {

    // ternary(a): EvaluationValuesInterface {
    //     const result = a > 10 ? 5 : 3;
    //     return {cyclomaticValue: 2, cognitiveValue: 0};
    // }

    ternaries(a): EvaluationValuesInterface {
        const result = a > 10 ? 5 : ((a <5) ? 3 : 2);
        return {cyclomaticValue: 2, cognitiveValue: 0};
    }

    // reducer(acc: Object, curr: any, index: number, path: number) {
    //     return Object(acc[curr]) === acc[curr] ? acc[curr] : (acc[curr] = isNaN(+path[index + 1]) ? {} : []);
    // }
}
