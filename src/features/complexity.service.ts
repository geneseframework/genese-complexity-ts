import * as ts from 'typescript';
import * as utils from 'tsutils';

/**
 * Calculates the cognitive complexity of a method
 * @param method: ts.Node
 */
export function getMethodCognitiveComplexity(method: ts.Node): number {
    let complexity = 0;
    let depthLevel = 0;
    ts.forEachChild(method, function cb(node) {
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



/**
 * Calculates the cyclomatic complexity of a method
 * @param node: ts.Node
 */
export function getMethodCyclomaticComplexity(node: ts.Node): number {
    let totalComplexity = 1;
    ts.forEachChild(node, function cb(node) {
        if (utils.isFunctionWithBody(node)) {
            totalComplexity += 1;
            ts.forEachChild(node, cb);
        } else {
            if (increasesComplexity(node, 'cyclomatic')) {
                totalComplexity += 1;
            }
            ts.forEachChild(node, cb);
        }
    });
    return totalComplexity;
}


export function increasesComplexity(node, method : 'cognitive' | 'cyclomatic') {
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
