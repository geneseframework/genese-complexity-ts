import { EvaluationValues } from '../interfaces/evaluation-values';

export class AstMock {



    ifAndOr(a, b, c, d): EvaluationValues {
        if (a && b && c || d || a && c) {
            console.log(a);
        }
        return {cyclomaticValue: 4, cognitiveValue: 3};
    }
}
