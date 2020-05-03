import { EvaluationValues } from '../interfaces/evaluation-values';

export class Evaluation implements EvaluationValues {

    cognitiveValue?= 0;
    cyclomaticValue?= 0;
    filename?= '';
    methodName?= '';

    add(evaluation: Evaluation): Evaluation {
        const newEval = new Evaluation();
        newEval.cognitiveValue = this.cognitiveValue + evaluation.cognitiveValue;
        newEval.cyclomaticValue = this.cyclomaticValue + evaluation.cyclomaticValue;
        return newEval;
    }
}
