import * as Lint from 'tslint';
import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import * as utils from 'tsutils';
import { increasesComplexity } from './complexity.service';
import { ReportService } from './report.service';
import { Evaluation } from '../models/evaluation';



/**
 * Walker of the rule
 * Browse the sourceFile and calculates cognitive complexity for each method
 */
export class Walker  {

    private readonly options: object;
    private readonly reportService: ReportService = ReportService.getInstance();
    private readonly sourceFile: ts.SourceFile;

    constructor(sourceFile: ts.SourceFile, options?: object) {
        this.sourceFile = sourceFile;
    }

    public walk(): void {
        const threshold = 3;
        // const threshold: number = this.options?. as any;
        Object.assign(this.sourceFile, {depthLevel: 1});
        const cb = (node: ts.Node): void => {
            if (node.kind === SyntaxKind.MethodDeclaration) {
                const method: ts.MethodDeclaration = node as ts.MethodDeclaration;
                const cognitiveValue = calculateCognitiveComplexityOfMethod(node);
                const cyclomaticValue = calculateCyclomaticComplexityOfMethod(node);
                const evaluation: Evaluation = {
                    filename: 'Mock',
                    methodName: node?.['name']?.['escapedText'],
                    cognitiveValue: cognitiveValue,
                    cyclomaticValue: cyclomaticValue
                };
                this.reportService.addEvaluation(evaluation);
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
