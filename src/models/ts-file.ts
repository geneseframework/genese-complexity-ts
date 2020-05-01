import * as ts from 'typescript';
import { TsMethod } from './ts-method';
import { TsFolder } from './ts-folder';
import { TsTree } from './ts-tree.model';
import { Ast } from '../services/ast.service';
import { Evaluation } from './evaluation';

export class TsFile {

    private _evaluation?: Evaluation = new Evaluation();
    tsMethods?: TsMethod[] = [];
    name ?= '';
    sourceFile?: ts.SourceFile = undefined;
    tsFolder?: TsFolder = new TsFolder();
    tsTree?: TsTree = new TsTree();

    constructor() {
    }


    getEvaluation(): Evaluation {
        return this._evaluation ?? this.evaluate();
    }


    setName(): void {
        this.name = this.sourceFile.fileName;
    }


    setTree(): void {
        this.tsTree = Ast.getTree(this.sourceFile);
    }


    addMethods(): void {
        const methods: TsMethod[] = [];
        ts.forEachChild(this.sourceFile, function cb(node) {
            if (node.kind === ts.SyntaxKind.MethodDeclaration) {
                const newMethod: TsMethod = new TsMethod(node);
                newMethod.tsFile = this;
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        this.tsMethods = methods;
    }


    private evaluate(): Evaluation {
        let evaluation: Evaluation = new Evaluation();
        for (const method of this.tsMethods) {
            evaluation.add(method.getEvaluation());
        }
        this._evaluation = evaluation;
        return evaluation;
    }
}
