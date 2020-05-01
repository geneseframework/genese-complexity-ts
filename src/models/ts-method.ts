import * as ts from 'typescript';
import * as utils from 'tsutils';
import { increasesComplexity } from '../services/complexity.service';
import { TsFile } from './ts-file';
import { TsTree } from './ts-tree.model';
import { Ast } from '../services/ast.service';
import { Evaluation } from './evaluation';

export class TsMethod {

    node: ts.Node = undefined;
    private _evaluation?: Evaluation = undefined;
    currentDepth = 0;
    tsFile?: TsFile = new TsFile();
    tsTree?: TsTree = new TsTree();

    constructor(node: ts.Node) {
        this.node = node;
        this.tsTree = Ast.getTree(node);
    }


    getEvaluation(): Evaluation {
        return this._evaluation ?? this.evaluate();
    }


    private evaluate(): Evaluation {
        const evaluation: Evaluation = new Evaluation();
        evaluation.cognitiveValue = this.calculateCognitiveComplexity(this.node);
        evaluation.cyclomaticValue = this.calculateCognitiveComplexity(this.node);
        evaluation.methodName = Ast.getMethodName(this.node);
        evaluation.filename = this.tsFile?.sourceFile?.fileName ?? '';
        this._evaluation = evaluation;
        return evaluation;
    }


    calculateCognitiveComplexity(ctx): number {
        let complexity = 0;
        let depthLevel = 0;
        ts.forEachChild(ctx, function cb(node) {
            if (utils.isFunctionWithBody(node)) {
                depthLevel ++;
                complexity += depthLevel;
                ts.forEachChild(node, cb);
            } else {
                if (increasesComplexity(node, 'cognitive')) {
                    depthLevel ++;
                    complexity += depthLevel;
                }
                ts.forEachChild(node, cb);
            }
        });
        return complexity;
    }

}
