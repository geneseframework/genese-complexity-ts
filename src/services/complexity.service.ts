import * as ts from 'typescript';
import * as utils from 'tsutils';
import { TsBloc } from '../models/ts-bloc.model';

export class ComplexityService {



    static calculateCognitiveComplexity(tsBloc: TsBloc): number {
        let complexity = 0;
        if (tsBloc) {
            for (const bloc of tsBloc?.children) {
                console.log('TSBLOC', ts.SyntaxKind[bloc.node.kind]);
                if (ComplexityService.increasesCognitiveComplexity(bloc.node)) {
                    console.log('depth', bloc.depth);
                    complexity += bloc.depth + 1;
                }
                complexity += ComplexityService.calculateCognitiveComplexity(bloc);
            }
        }
        return complexity;
    }



    // static calculateCognitiveComplexity(node: ts.Node): number {
    //     let complexity = 0;
    //     let depthLevel = 0;
    //     ts.forEachChild(node, function cb(node) {
    //         if (utils.isFunctionWithBody(node)) {
    //             depthLevel ++;
    //             complexity += depthLevel;
    //             ts.forEachChild(node, cb);
    //         } else {
    //             if (ComplexityService.increasesComplexity(node, 'cognitive')) {
    //                 depthLevel ++;
    //                 complexity += depthLevel;
    //             }
    //             ts.forEachChild(node, cb);
    //         }
    //     });
    //     return complexity;
    // }


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
        switch (node?.kind) {
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.WhileStatement:
                newDepth = depth + 1;
                break;
            default:
                newDepth = depth;
                break;
        }
        // console.log(`NODE ${ts.SyntaxKind[node?.kind]} depth ${newDepth}`);
        return newDepth;
    }


    static increasesCognitiveComplexity(node: ts.Node): boolean {
        switch (node.kind) {
            case ts.SyntaxKind.CaseClause:
                // return (node).statements.length > 0;
            case ts.SyntaxKind.QuestionDotToken:
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.ConditionalExpression:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.WhileStatement:
                return true;
            // case ts.SyntaxKind.BinaryExpression:
            //     switch ((node).operatorToken.kind) {
            //         case ts.SyntaxKind.BarBarToken:
            //         case ts.SyntaxKind.AmpersandAmpersandToken:
            //             return true;
            //         default:
            //             return false;
            //     }
            default:
                return false;
        }
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
