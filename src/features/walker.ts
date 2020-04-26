import * as Lint from 'tslint';
import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import * as utils from 'tsutils';
import { increasesComplexity } from './complexity.service';



/**
 * Walker of the rule
 * Browse the sourceFile and calculates cognitive complexity for each method
 */
export class Walker  {

    private readonly options: object;
    private readonly sourceFile: ts.SourceFile;

    constructor(sourceFile: ts.SourceFile, options?: object) {
        this.sourceFile = sourceFile;
    }

    public walk(): void {
        const threshold = 3;
        // const threshold: number = this.options?. as any;
        Object.assign(this.sourceFile, {depthLevel: 1});
        const cb = (node: ts.Node): void => {
            if (node.kind === SyntaxKind.MethodDeclaration && node?.['name']?.['escapedText'] === 'sumOfPrimes') {
                const method: ts.MethodDeclaration = node as ts.MethodDeclaration;
                const cc = calculateCognitiveComplexityOfMethod(node);
                if (cc > threshold) {
                    const error = `\r\nMethod ${method.name['escapedText']} : cognitive complexity = ${cc} (threshold = ${threshold})`;
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
