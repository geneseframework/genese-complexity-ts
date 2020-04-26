import * as Lint from 'tslint';
import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = 'Method not typed';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NgNoUntypedMethodsWalker(sourceFile, 'ng-no-untyped-methods', void this.getOptions()));
    }
}

class NgNoUntypedMethodsWalker extends Lint.AbstractWalker {

    static isTypedMethod(node: ts.MethodDeclaration): boolean {
        return Boolean(node.type !== undefined);
    }

    public walk(sourceFile: ts.SourceFile): void {
        const cb = (node: ts.Node): void => {
            if (node.kind === SyntaxKind.MethodDeclaration) {
                if (!NgNoUntypedMethodsWalker.isTypedMethod(node as ts.MethodDeclaration)) {
                    this.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING);
                }
            }
            return ts.forEachChild(node, cb);
        };

        return ts.forEachChild(sourceFile, cb);
    }
}
