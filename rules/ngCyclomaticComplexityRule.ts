import * as Lint from 'tslint';
import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import * as utils from 'tsutils';
import { increasesComplexity } from './complexity.service';

export class Rule extends Lint.Rules.AbstractRule {

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const threshold = this.getOptions()?.ruleArguments?.[0];
        if (threshold) {
            return this.applyWithWalker(new NgCyclomaticComplexityWalker(sourceFile, 'ng-cyclomatic-complexity', threshold));
        } else {
            console.log('WARNING : ng-cyclomatic-complexity is not correctly implemented. The correct format is like [true, 5]');
        }
    }
}


/**
 * Walker of the rule
 * Browse the sourceFile and calculates cyclomatic complexity for each method
 */
export class NgCyclomaticComplexityWalker extends Lint.AbstractWalker {


    public walk(sourceFile: ts.SourceFile): void {
        const threshold: number = this.options as any;
        const cb = (node: ts.Node): void => {
            if (node.kind === SyntaxKind.MethodDeclaration) {
                const method: ts.MethodDeclaration = node as ts.MethodDeclaration;
                const cc = calculateCyclomaticComplexityOfMethod(node);
                if (cc > threshold) {
                    const error = `\r\nMethod ${method.name['escapedText']} : cyclomatic complexity = ${cc} (threshold = ${threshold})`;
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

export class Walker {

    options = 3;
    sourceFile: ts.SourceFile;

    constructor(sourceFile: ts.SourceFile) {
        this.sourceFile = sourceFile;
    }

    walk() {
        const threshold: number = this.options as any;
        const cb = (node: ts.Node): void => {
            if (node.kind === SyntaxKind.MethodDeclaration) {
                const method: ts.MethodDeclaration = node as ts.MethodDeclaration;
                const cc = calculateCyclomaticComplexityOfMethod(node);
                if (cc > threshold) {
                    const error = `\r\nMethod ${method.name['escapedText']} : cyclomatic complexity = ${cc} (threshold = ${threshold})`;
                    console.log('FAILURE ', error);
                    // this.addFailureAt(node.getStart(), node.getWidth(), error);
                } else {
                    // TODO : output results in a report file
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(this.sourceFile, cb);
    }
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
