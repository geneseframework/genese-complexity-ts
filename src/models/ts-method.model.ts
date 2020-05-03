import * as ts from 'typescript';
import { TsFile } from './ts-file.model';
import { Ast } from '../services/ast.service';
import { ComplexityService as CS } from '../services/complexity.service';
import { Evaluation } from './evaluation.model';
import { TsBloc } from './ts-bloc.model';
import { Options } from './options';

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
        evaluation.cognitiveAboveThreshold = evaluation.cognitiveValue > Options.cognitiveThreshold;
        evaluation.cyclomaticValue = CS.calculateCyclomaticComplexity(this.node);
        evaluation.cyclomaticAboveThreshold = evaluation.cyclomaticValue > Options.cyclomaticThreshold;
        evaluation.methodName = Ast.getMethodName(this.node);
        evaluation.filename = this.tsFile?.sourceFile?.fileName ?? '';
        this._evaluation = evaluation;
        return evaluation;
    }

}
