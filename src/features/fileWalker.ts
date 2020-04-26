import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import { calculateCognitiveComplexityOfMethod, calculateCyclomaticComplexityOfMethod } from './complexity.service';
import { ReportService } from './report.service';
import { Evaluation } from '../models/evaluation';


/**
 * Browse the sourceFile and calculates cognitive and cyclomatic complexities for each method
 */
export class FileWalker  {

    private readonly reportService: ReportService = ReportService.getInstance();
    private readonly sourceFile: ts.SourceFile;

    constructor(sourceFile: ts.SourceFile) {
        this.sourceFile = sourceFile;
    }

    public walk(): void {
        Object.assign(this.sourceFile, {depthLevel: 1});
        const cb = (node: ts.Node): void => {
            if (node.kind === SyntaxKind.MethodDeclaration) {
                const cognitiveValue = calculateCognitiveComplexityOfMethod(node);
                const cyclomaticValue = calculateCyclomaticComplexityOfMethod(node);
                const evaluation: Evaluation = {
                    filename: this.sourceFile.fileName,
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
