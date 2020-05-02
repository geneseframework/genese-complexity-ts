import * as ts from 'typescript';
import { TsFile } from './ts-file.model';
import { Ast } from '../services/ast.service';
import { ComplexityService as CS } from '../services/complexity.service';
import { Evaluation } from './evaluation.model';
import { TsBloc } from './ts-bloc.model';

export class TsMethod {

    node: ts.Node = undefined;
    private _evaluation?: Evaluation = undefined;
    tsFile?: TsFile = new TsFile();
    _tsBloc?: TsBloc = undefined;

    constructor(node: ts.Node) {
        this.node = node;
        this._tsBloc = this.getTsBlocs();
    }


    getEvaluation(): Evaluation {
        // console.log('TREE children', this._tsBloc.children);
        // console.log('TREE NB children', this._tsBloc.children.length);
        return this._evaluation ?? this.evaluate();
    }


    getTsBlocs(): TsBloc {
        if (this._tsBloc) {
            return this._tsBloc;
        } else {
            const tsBloc: TsBloc = new TsBloc();
            tsBloc.node = this.node;
            tsBloc.depth = 0;
            this._tsBloc = Ast.getBloc(tsBloc);
            console.log('TS BLOCS children', this._tsBloc.children[6]);
        }
    }


    private evaluate(): Evaluation {
        const evaluation: Evaluation = new Evaluation();
        evaluation.cognitiveValue = CS.calculateCognitiveComplexity(this.node);
        evaluation.cyclomaticValue = CS.calculateCyclomaticComplexity(this.node);
        evaluation.methodName = Ast.getMethodName(this.node);
        evaluation.filename = this.tsFile?.sourceFile?.fileName ?? '';
        this._evaluation = evaluation;
        return evaluation;
    }

}
