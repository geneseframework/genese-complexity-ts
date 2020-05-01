import * as ts from 'typescript';
import { TsMethod } from './ts-method';
import { TsFolder } from './ts-folder';
import { TsTree } from './ts-tree.model';

export class TsFile {

    methods?: TsMethod[] = [];
    name ?= '';
    sourceFile?: ts.SourceFile = undefined;
    tsFolder?: TsFolder = new TsFolder();
    tsTree?: TsTree = new TsTree();

    constructor() {
    }

    setName(): void {
        this.name = this.sourceFile.fileName;
    }


    addMethods(): void {
        ts.forEachChild(this.sourceFile, node => {
            if (node.kind === ts.SyntaxKind.MethodDeclaration) {
                this.methods.push(new TsMethod(node));
            }
        })
    }


    // addMethod(node: ts.Node): void {
    //     const method: TsMethod = new TsMethod(node);
    // }
}
