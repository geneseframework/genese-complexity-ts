import { EvaluationValuesInterface } from '../interfaces/evaluation-values.interface';

export class AstMock {

    caller(a) {
        this.methodWithCallback(a, () => {
            console.log(a);
            if (a < 2) {
                console.log(3)
            }
        })
    }

    methodWithCallback(a, cb): EvaluationValuesInterface {
        cb(a + 3);
        return {cyclomaticValue: 2, cognitiveValue: 0};
    }

}
