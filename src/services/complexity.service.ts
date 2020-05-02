import * as ts from 'typescript';
import * as utils from 'tsutils';
import { TsBloc } from '../models/ts-bloc.model';
import { Ast } from './ast.service';

export class ComplexityService {



    static calculateCognitiveComplexity(tsBloc: TsBloc): number {
        let complexity = 0;
        if (tsBloc) {
            for (const bloc of tsBloc?.children) {
                // console.log('TSBLOC', ts.SyntaxKind[bloc.node.kind]);
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
        switch (node?.kind) {
            case ts.SyntaxKind.CatchClause:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.MethodDeclaration:
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


    static addCognitiveComplexity(tsBloc: TsBloc): number {
        if (!tsBloc?.node || !tsBloc?.depth) {
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
            case ts.SyntaxKind.WhileStatement:
                return tsBloc.depth + 1;
            case ts.SyntaxKind.BinaryExpression:
                return ComplexityService.addBinaryCognitiveComplexity(tsBloc);
            // switch ((node).operatorToken.kind) {
            //         case ts.SyntaxKind.BarBarToken:
            //         case ts.SyntaxKind.AmpersandAmpersandToken:
            //             return true;
            //         default:
            //             return false;
            //     }
            default:
                return 0;
        }
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
