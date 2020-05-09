import * as ts from 'typescript';
import { TsFile } from './ts-file.model';
import { Ast } from '../services/ast.service';
import { ComplexityService as CS } from '../services/complexity.service';
import { Evaluation } from './evaluation.model';
import { TsTree } from './ts-tree.model';
import { Options } from './options';
import { EvaluationStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';

export class TsMethod {

    private _evaluation?: Evaluation = undefined;

    name = '';
    node: ts.Node = undefined;
    tsFile?: TsFile = new TsFile();
    tsTree?: TsTree = undefined;

    constructor(node: ts.Node) {
        this.node = node;
        this.name = Ast.getMethodName(node);
    }


    getEvaluation(): Evaluation {
        return this._evaluation ?? this.evaluate();
    }


    private evaluate(): Evaluation {
        this._evaluation = new Evaluation();
        this._evaluation.cognitiveValue = CS.calculateCognitiveComplexity(this.tsTree);
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
