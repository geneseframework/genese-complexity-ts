import { EvaluationValuesInterface } from '../interfaces/evaluation-values.interface';

export class AstMock {

    ifAndAndOrAndAndOrOr(a, b, c, d, e, f): EvaluationValuesInterface {
        if (b && c || d && f || a) {
            console.log(a);
        }
        return {cyclomaticValue: 9, cognitiveValue: 5};
    }
}
