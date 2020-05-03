import { EvaluationValues } from '../interfaces/evaluation-values';

export class Evaluation implements EvaluationValues {

    cognitiveAboveThreshold ?= false;
    cognitiveValue ?= 0;
    cyclomaticAboveThreshold ?= false;
    cyclomaticValue ?= 0;
    filename ?= '';
    methodName ?= '';

    add(evaluation: Evaluation): Evaluation {
        const newEval = new Evaluation();
        newEval.cognitiveValue = this.cognitiveValue + evaluation.cognitiveValue;
        newEval.cyclomaticValue = this.cyclomaticValue + evaluation.cyclomaticValue;
        return newEval;
    }
}
