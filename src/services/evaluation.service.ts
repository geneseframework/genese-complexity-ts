import { Evaluation } from '../models/evaluation';

export class EvaluationService {

    static add(firstEval: Evaluation, secondEval: Evaluation): Evaluation {
        const evaluation = new Evaluation();
        evaluation.cognitiveValue = firstEval.cognitiveValue + secondEval.cognitiveValue;
        evaluation.cognitiveValue = firstEval.cyclomaticValue + secondEval.cyclomaticValue;
        return evaluation;
    }
}
