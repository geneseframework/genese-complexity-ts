import * as Lint from 'tslint';
import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import * as utils from 'tsutils';
import { increasesComplexity } from './complexity.service';

export class Rule extends Lint.Rules.AbstractRule {

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const threshold = this.getOptions()?.ruleArguments?.[0];
        if (threshold) {
            return this.applyWithWalker(new NgCognitiveComplexityWalker(sourceFile, 'ng-cognitive-complexity', threshold));
        } else {
            console.log('WARNING : ng-cognitive-complexity is not correctly implemented. The correct format is like [true, 5]');
        }
    }
}



/**
 * Walker of the rule
 * Browse the sourceFile and calculates cognitive complexity for each method
 */
class NgCognitiveComplexityWalker extends Lint.AbstractWalker {


    public walk(sourceFile: ts.SourceFile): void {
        const threshold: number = this.options as any;
        Object.assign(sourceFile, {depthLevel: 1});
        const cb = (node: ts.Node): void => {
            if (node.kind === SyntaxKind.MethodDeclaration && node?.['name']?.['escapedText'] === 'sumOfPrimes') {
                const method: ts.MethodDeclaration = node as ts.MethodDeclaration;
                const cc = calculateCognitiveComplexityOfMethod(node);
                if (cc > threshold) {
                    const error = `\r\nMethod ${method.name['escapedText']} : cognitive complexity = ${cc} (threshold = ${threshold})`;
                    this.addFailureAt(node.getStart(), node.getWidth(), error);
                } else {
                    // TODO : output results in a report file
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    }
}



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
