import { EvaluationValues } from '../interfaces/evaluation-values';

export class AstMock {

    ifAndAndOrAndAndOrOr(a, b, c, d, e, f): EvaluationValues {
        if (b && c || d && f || a) {
            console.log(a);
        }
        return {cyclomaticValue: 9, cognitiveValue: 5};
    }
}
