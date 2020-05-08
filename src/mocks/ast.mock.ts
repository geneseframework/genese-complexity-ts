import { EvaluationValuesInterface } from '../interfaces/evaluation-values.interface';

export class AstMock {

    recursion(a) {
        if (a > 10) {
            this.other(a);
        }
    }

    other(a) {

    }
}
