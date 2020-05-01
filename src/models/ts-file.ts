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
        const methods: TsMethod[] = [];
        ts.forEachChild(this.sourceFile, function cb(node) {
            if (node.kind === ts.SyntaxKind.MethodDeclaration) {
                methods.push(new TsMethod(node));
            }
            ts.forEachChild(node, cb);
        });
        this.methods = methods;
    }
}
