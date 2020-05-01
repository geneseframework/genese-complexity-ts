import * as ts from 'typescript';
import { Ast } from '../features/ast.service';
import { TsTreeTrace } from './ts-tree-trace.model';

export class TsTree {

    syntaxKindName?: string;
    node?: ts.Node;
    parent?: TsTree;
    children?: TsTree[] = [];
    childNodes?: ts.Node[] = [];
    private signature?: string = undefined;
    private _trace?: TsTreeTrace = undefined;

    constructor() {
    }


    getTrace(): TsTreeTrace {
        return this._trace ?? this.constructTrace(this);
    }


    constructTrace(tsTree: TsTree): TsTreeTrace {
        const treeTrace: TsTreeTrace = {
            syntaxKindName: tsTree.syntaxKindName,
            children: []
        }
        for (const child of tsTree.children) {
            const childTrace: TsTreeTrace = {syntaxKindName: child.syntaxKindName};
            treeTrace.children.push(childTrace);
            this.constructTrace(child);
        }
        this._trace = treeTrace;
        return this._trace;
    }

    toString(): string {
        return this.signature ?? this.constructSignature(this);
    }

    constructSignature(tree: TsTree): string {
        this.signature = `${this.signature}\r\n${Ast.getSyntaxKindName(tree.node)}`;
        for (const child of tree.children) {
            this.constructSignature(child);
        }
        return this.signature;
    }
}
