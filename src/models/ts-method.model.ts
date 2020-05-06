import * as ts from 'typescript';
import { TsFile } from './ts-file.model';
import { Ast } from '../services/ast.service';
import { ComplexityService as CS } from '../services/complexity.service';
import { Evaluation } from './evaluation.model';
import { TsBloc } from './ts-bloc.model';
import { Options } from './options';
import { EvaluationStatus } from '../enums/evaluation-status.enum';

export class TsMethod {

    node: ts.Node = undefined;
    private _evaluation?: Evaluation = undefined;
    tsFile?: TsFile = new TsFile();
    private _tsBloc?: TsBloc = undefined;

    constructor(node: ts.Node) {
        this.node = node;
        this._tsBloc = this.getTsBloc();
    }


    getEvaluation(): Evaluation {
        return this._evaluation ?? this.evaluate();
    }


    getTsBloc(): TsBloc {
        if (this._tsBloc) {
            return this._tsBloc;
        } else {
            const tsBloc: TsBloc = new TsBloc();
            tsBloc.node = this.node;
            tsBloc.depth = 0;
            tsBloc.tsMethod = this;
            this._tsBloc = Ast.getBloc(tsBloc);
            return this._tsBloc;
        }
    }


    private evaluate(): Evaluation {
        const evaluation: Evaluation = new Evaluation();
        evaluation.cognitiveValue = CS.calculateCognitiveComplexity(this._tsBloc);
        evaluation.cognitiveStatus = this.getCognitiveStatus();
        evaluation.cyclomaticValue = CS.calculateCyclomaticComplexity(this.node);
        evaluation.cyclomaticStatus = this.getCyclomaticStatus();
        evaluation.methodName = Ast.getMethodName(this.node);
        evaluation.filename = this.tsFile?.sourceFile?.fileName ?? '';
        this._evaluation = evaluation;
        return evaluation;
    }


    getCognitiveStatus(): EvaluationStatus {
        let status = EvaluationStatus.WARNING;
        if (this._evaluation.cognitiveValue < Options.cognitive.thresholdWarning) {
            status = EvaluationStatus.CORRECT;
        } else if (this._evaluation.cognitiveValue >= Options.cognitive.thresholdError) {
            status = EvaluationStatus.ERROR;
        }
        return status;
    }


    getCyclomaticStatus(): EvaluationStatus {
        let status = EvaluationStatus.WARNING;
        if (this._evaluation.cyclomaticValue < Options.cyclomatic.thresholdWarning) {
            status = EvaluationStatus.CORRECT;
        } else if (this._evaluation.cyclomaticValue >= Options.cyclomatic.thresholdError) {
            status = EvaluationStatus.ERROR;
        }
        return status;
    }

}
