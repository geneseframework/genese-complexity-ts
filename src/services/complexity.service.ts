import * as ts from 'typescript';
import * as utils from 'tsutils';
import { TsBloc } from '../models/ts-bloc.model';
import { Ast } from './ast.service';

export class ComplexityService {



    static calculateCognitiveComplexity(tsBloc: TsBloc): number {
        let complexity = 0;
        if (tsBloc) {
            for (const bloc of tsBloc?.children) {
                // console.log('CALCULATE COMPLEXITY', ts.SyntaxKind[bloc.node.kind]);
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
            // console.log('CALCULATE COMPLEXITY increaseDepth', Ast.getSyntaxKindName(node));
            switch (node?.parent.kind) {
                case ts.SyntaxKind.CatchClause:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.WhileStatement:
                    newDepth = depth + 1;
                    console.log('INCREASE DEPTH node?.parent', Ast.getSyntaxKindName(node?.parent), 'depth', newDepth);
                    break;
                default:
                    newDepth = depth;
                    break;
            }
        } else {
            newDepth = 0;
        }
        // console.log(`NODE ${ts.SyntaxKind[node?.kind]} depth ${newDepth}`);
        return newDepth;
    }


    static addCognitiveComplexity(tsBloc: TsBloc): number {
        // console.log('ADD ', Ast.getSyntaxKindName(tsBloc.node) , 'DEPTH', tsBloc.depth);
        let complexity = 0;
        if (!tsBloc?.node || tsBloc?.depth === undefined) {
            return 0;
        }
        // console.log('KIND ', Ast.getSyntaxKindName(tsBloc.node) , 'DEPTH', tsBloc.depth);
        // console.log('DEPTH ', tsBloc.depth);
        // if (tsBloc.node?.kind === ts.SyntaxKind.Block) {
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
                case ts.SyntaxKind.WhileStatement:
                    complexity = tsBloc.depth + 1;
                    console.log('ADD CPX ', complexity);
                    break;
                case ts.SyntaxKind.BinaryExpression:
                    complexity = ComplexityService.addBinaryCognitiveComplexity(tsBloc);
                    break;
                default:
                    complexity = 0;
            }
        // } else {
        //     complexity = 0
        // }
        return complexity;
    }


    static addBinaryCognitiveComplexity(tsBloc: TsBloc): number {
        let complexity = 1;
        if (Ast.isBinary(tsBloc?.parent?.node) && Ast.isSameOperatorToken(tsBloc.node, tsBloc.parent.node)) {
            console.log('BINARY BLOC', Ast.getSyntaxKindName(tsBloc.node['operatorToken']));
            console.log('BINARY PARENT', Ast.getSyntaxKindName(tsBloc.parent.node['operatorToken']));
            complexity = 0;
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
// const zzz = {
//     children: [
//         TsBloc {
//             children: [],
//             depth: 1,
//             tsMethod: [TsMethod],
//             node: [IdentifierObject],
//             parent: [Circular],
//             syntaxKindName: 'Identifier'
//         },
//         TsBloc {
//             children: [],
//             depth: 1,
//             tsMethod: [TsMethod],
//             node: [TokenObject],
//             parent: [Circular],
//             syntaxKindName: 'AmpersandAmpersandToken'
//         },
//         TsBloc {
//             children: [],
//             depth: 1,
//             tsMethod: [TsMethod],
//             node: [IdentifierObject],
//             parent: [Circular],
//             syntaxKindName: 'Identifier'
//         }
//     ],
//     depth: 1,
//     tsMethod: TsMethod {
//         node: NodeObject {
//             pos: 22,
//                 end: 123,
//                 flags: 0,
//                 modifierFlagsCache: 0,
//                 transformFlags: 0,
//                 parent: undefined,
//                 kind: 161,
//                 decorators: undefined,
//                 modifiers: undefined,
//                 name: [IdentifierObject],
//                 questionToken: undefined,
//                 asteriskToken: undefined,
//                 typeParameters: undefined,
//                 parameters: [Array],
//                 type: [TokenObject],
//                 body: [NodeObject]
//         },
//         _evaluation: undefined,
//             tsFile: TsFile {
//             _evaluation: undefined,
//                 tsMethods: [Array],
//                 name: 'ast.mock.ts',
//                 sourceFile: [SourceFileObject],
//                 tsFolder: [TsFolder]
//         },
//         _tsBloc: TsBloc {
//             children: [Array],
//                 depth: 0,
//                 tsMethod: [Circular],
//                 node: [NodeObject],
//                 syntaxKindName: 'MethodDeclaration'
//         }
//     },
//     node: NodeObject {
//         pos: 71,
//             end: 77,
//             flags: 0,
//             modifierFlagsCache: 0,
//             transformFlags: 0,
//             parent: NodeObject {
//             pos: 71,
//                 end: 82,
//                 flags: 0,
//                 modifierFlagsCache: 0,
//                 transformFlags: 0,
//                 parent: [NodeObject],
//                 kind: 209,
//                 left: [Circular],
//                 operatorToken: [TokenObject],
//                 right: [IdentifierObject]
//         },
//         kind: 209,
//             left: IdentifierObject {
//             pos: 71,
//                 end: 72,
//                 flags: 0,
//                 modifierFlagsCache: 0,
//                 transformFlags: 0,
//                 parent: [Circular],
//                 kind: 75,
//                 escapedText: 'a'
//         },
//         operatorToken: TokenObject {
//             pos: 72,
//                 end: 75,
//                 flags: 0,
//                 modifierFlagsCache: 0,
//                 transformFlags: 0,
//                 parent: [Circular],
//                 kind: 55
//         },
//         right: IdentifierObject {
//             pos: 75,
//                 end: 77,
//                 flags: 0,
//                 modifierFlagsCache: 0,
//                 transformFlags: 0,
//                 parent: [Circular],
//                 kind: 75,
//                 escapedText: 'b'
//         }
//     },
//     parent: TsBloc {
//         children: [ [Circular], [TsBloc], [TsBloc] ],
//             depth: 1,
//             tsMethod: TsMethod {
//             node: [NodeObject],
//                 _evaluation: undefined,
//                 tsFile: [TsFile],
//                 _tsBloc: [TsBloc]
//         },
//         node: NodeObject {
//             pos: 71,
//                 end: 82,
//                 flags: 0,
//                 modifierFlagsCache: 0,
//                 transformFlags: 0,
//                 parent: [NodeObject],
//                 kind: 209,
//                 left: [NodeObject],
//                 operatorToken: [TokenObject],
//                 right: [IdentifierObject]
//         },
//         parent: TsBloc {
//             children: [Array],
//                 depth: 1,
//                 tsMethod: [TsMethod],
//                 node: [NodeObject],
//                 parent: [TsBloc],
//                 syntaxKindName: 'IfStatement'
//         },
//         syntaxKindName: 'BinaryExpression'
//     },
//     syntaxKindName: 'BinaryExpression'
// }
