import * as ts from 'typescript';
import * as utils from 'tsutils';
import { TsBloc } from '../models/ts-bloc.model';
import { Ast } from './ast.service';

export class ComplexityService {



    static calculateCognitiveComplexity(tsBloc: TsBloc): number {
        let complexity = 0;
        if (tsBloc) {
            for (const bloc of tsBloc?.children) {
                complexity += ComplexityService.addCognitiveComplexity(bloc);
                complexity += ComplexityService.calculateCognitiveComplexity(bloc);
            }
        }
        return complexity;
    }


    /**
     * Calculates the cyclomatic complexity of a method
     * @param node: ts.Node
     */
    static calculateCyclomaticComplexity(node: ts.Node): number {
        let totalComplexity = 1;
        ts.forEachChild(node, function cb(node) {
            if (utils.isFunctionWithBody(node)) {
                totalComplexity += 1;
                ts.forEachChild(node, cb);
            } else {
                if (ComplexityService.increasesComplexity(node, 'cyclomatic')) {
                    totalComplexity += 1;
                }
                ts.forEachChild(node, cb);
            }
        });
        return totalComplexity;
    }



    static increaseDepth(node: ts.Node, depth: number): number {
        let newDepth: number;
        if (node?.kind === ts.SyntaxKind.Block) {
            switch (node?.parent.kind) {
                case ts.SyntaxKind.CatchClause:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.SwitchStatement:
                case ts.SyntaxKind.WhileStatement:
                    newDepth = depth + 1;
                    break;
                default:
                    newDepth = depth;
                    break;
            }
        } else {
            newDepth = 0;
        }
        return newDepth;
    }


    static addCognitiveComplexity(tsBloc: TsBloc): number {
        let complexity = 0;
        if (!tsBloc?.node || tsBloc?.depth === undefined) {
            return 0;
        }
        switch (tsBloc.node.kind) {
            case ts.SyntaxKind.QuestionDotToken:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.ConditionalExpression:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SwitchStatement:
            case ts.SyntaxKind.WhileStatement:
                complexity = tsBloc.depth + 1;
                break;
            case ts.SyntaxKind.BinaryExpression:
                complexity = ComplexityService.addBinaryCognitiveComplexity(tsBloc);
                break;
            default:
                complexity = 0;
        }
        return complexity;
    }


    static addBinaryCognitiveComplexity(tsBloc: TsBloc): number {
        let complexity = 0;
        if (Ast.isBinary(tsBloc?.node)) {
            console.log('IS BINARY')
            if (Ast.isLogicDoor(tsBloc.node)) {
                console.log('IS LOGIC DOOR')
                if (Ast.isSameOperatorToken(tsBloc.node, tsBloc.parent.node)) {
                    complexity = 0;
                } else {
                    console.log('NOT SAME TOKEN')
                    complexity = 1;
                }
            }
        }
        return complexity;
    }


    static increasesComplexity(node, method : 'cognitive' | 'cyclomatic') {
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
