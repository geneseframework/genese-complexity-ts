import * as ts from 'typescript';
import * as utils from 'tsutils';

/**
 * Calculates the cognitive complexity of a method
 * @param ctx: ts.Node
 */
export function calculateCognitiveComplexityOfMethod(ctx): number {
    let complexity = 1;
    let depthLevel = 0;
    ts.forEachChild(ctx, function cb(node) {
        if (utils.isFunctionWithBody(node)) {
            depthLevel ++;
            complexity += depthLevel;
            ts.forEachChild(node, cb);
        } else {
            if (increasesComplexity(node)) {
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
 * @param ctx: ts.Node
 */
export function calculateCyclomaticComplexityOfMethod(ctx): number {
    let totalComplexity = 1;
    ts.forEachChild(ctx, function cb(node) {
        if (utils.isFunctionWithBody(node)) {
            totalComplexity += 1;
            ts.forEachChild(node, cb);
        } else {
            if (increasesComplexity(node)) {
                totalComplexity += 1;
            }
            ts.forEachChild(node, cb);
        }
    });
    return totalComplexity;
}


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
