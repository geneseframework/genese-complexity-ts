import * as ts from 'typescript';
import * as utils from 'tsutils';
import { TsFile } from './ts-file.model';
import { Ast } from '../services/ast.service';
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
            // this._tsBloc = TsBlocService.getBloc(tsBloc);œ
            this._tsBloc = Ast.getBloc(tsBloc);
            console.log('TS BLOCS children', this._tsBloc);
        }
    }


    private evaluate(): Evaluation {
        const evaluation: Evaluation = new Evaluation();
        evaluation.cognitiveValue = this.calculateCognitiveComplexity(this.node);
        evaluation.cyclomaticValue = this.calculateCyclomaticComplexity(this.node);
        evaluation.methodName = Ast.getMethodName(this.node);
        evaluation.filename = this.tsFile?.sourceFile?.fileName ?? '';
        this._evaluation = evaluation;
        return evaluation;
    }


    calculateCognitiveComplexity(ctx): number {
        let complexity = 0;
        let depthLevel = 0;
        let __self = this;
        ts.forEachChild(ctx, function cb(node) {
            if (utils.isFunctionWithBody(node)) {
                depthLevel ++;
                complexity += depthLevel;
                ts.forEachChild(node, cb);
            } else {
                if (__self.increasesComplexity(node, 'cognitive')) {
                    depthLevel ++;
                    complexity += depthLevel;
                }
                ts.forEachChild(node, cb);
            }
        });
        return complexity;
    }


    /**
     * Calculates the cyclomatic complexity of a method
     * @param node: ts.Node
     */
    calculateCyclomaticComplexity(node: ts.Node): number {
        let totalComplexity = 1;
        let __self = this;
        ts.forEachChild(node, function cb(node) {
            if (utils.isFunctionWithBody(node)) {
                totalComplexity += 1;
                ts.forEachChild(node, cb);
            } else {
                if (__self.increasesComplexity(node, 'cyclomatic')) {
                    totalComplexity += 1;
                }
                ts.forEachChild(node, cb);
            }
        });
        return totalComplexity;
    }


    increasesComplexity(node, method : 'cognitive' | 'cyclomatic') {
        switch (node.kind) {
            case ts.SyntaxKind.CaseClause:
                return (node).statements.length > 0;
            case ts.SyntaxKind.QuestionDotToken:
                return method === 'cyclomatic';
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.ConditionalExpression:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.WhileStatement:
                return true;
            case ts.SyntaxKind.BinaryExpression:
                switch ((node).operatorToken.kind) {
                    case ts.SyntaxKind.BarBarToken:
                    case ts.SyntaxKind.AmpersandAmpersandToken:
                        return true;
                    default:
                        return false;
                }
            default:
                return false;
        }
    }

}
