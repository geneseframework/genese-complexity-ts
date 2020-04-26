import * as ts from 'typescript';


export function increasesComplexity(node) {
    switch (node.kind) {
        case ts.SyntaxKind.CaseClause:
            return (node).statements.length > 0;
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
