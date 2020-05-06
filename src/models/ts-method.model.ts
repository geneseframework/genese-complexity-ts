import * as ts from 'typescript';
import { TsFile } from './ts-file.model';
import { Ast } from '../services/ast.service';
import { ComplexityService as CS } from '../services/complexity.service';
import { Evaluation } from './evaluation.model';
import { TsBloc } from './ts-bloc.model';
import { Options } from './options';
import { EvaluationStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity.type';

export class TsMethod {

    private _evaluation?: Evaluation = undefined;
    name = '';
    node: ts.Node = undefined;
    private _tsBloc?: TsBloc = undefined;
    tsFile?: TsFile = new TsFile();

    constructor(node: ts.Node) {
        this.node = node;
        this.name = Ast.getMethodName(node);
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
        this._evaluation = new Evaluation();
        this._evaluation.cognitiveValue = CS.calculateCognitiveComplexity(this._tsBloc);
        this._evaluation.cognitiveStatus = this.getComplexityStatus(ComplexityType.COGNITIVE);
        this._evaluation.cyclomaticValue = CS.calculateCyclomaticComplexity(this.node);
        this._evaluation.cyclomaticStatus = this.getComplexityStatus(ComplexityType.CYCLOMATIC);
        this._evaluation.methodName = this.name;
        this._evaluation.filename = this.tsFile?.sourceFile?.fileName ?? '';
        return this._evaluation;
    }


    getComplexityStatus(cpxType: ComplexityType): EvaluationStatus {
        let status = EvaluationStatus.WARNING;
        if (
            (cpxType === ComplexityType.COGNITIVE && this._evaluation.cognitiveValue <= Options.cognitiveCpx.warningThreshold)
            ||
            (cpxType === ComplexityType.CYCLOMATIC && this._evaluation.cyclomaticValue <= Options.cyclomaticCpx.warningThreshold)) {
            status = EvaluationStatus.CORRECT;
        } else if (
            (cpxType === ComplexityType.COGNITIVE && this._evaluation.cognitiveValue > Options.cognitiveCpx.errorThreshold)
            ||
            (cpxType === ComplexityType.CYCLOMATIC && this._evaluation.cyclomaticValue > Options.cyclomaticCpx.errorThreshold)) {
            status = EvaluationStatus.ERROR;
        }
        return status;
    }

}
