import { EvaluationValuesInterface } from '../interfaces/evaluation-values.interface';
import { EvaluationStatus } from '../enums/evaluation-status.enum';

export class Evaluation implements EvaluationValuesInterface {

    cognitiveValue ?= 0;
    cyclomaticValue ?= 0;
    filename ?= '';
    methodName ?= '';
    cognitiveStatus?: EvaluationStatus = EvaluationStatus.CORRECT;
    cyclomaticStatus?: EvaluationStatus = EvaluationStatus.CORRECT;

    add(evaluation: Evaluation): Evaluation {
        const newEval = new Evaluation();
        newEval.cognitiveValue = this.cognitiveValue + evaluation.cognitiveValue;
        newEval.cyclomaticValue = this.cyclomaticValue + evaluation.cyclomaticValue;
        return newEval;
    }
}
