import * as ts from 'typescript';
import { TsMethod } from './ts-method.model';
import { Ast } from '../services/ast.service';
const chalk = require('chalk');

export class TsTree {

    children?: TsTree[] = [];
    depth ?= 0;
    increasesCognitiveComplexity = false;
    kind ?= '';
    node?: ts.Node;
    parent?: TsTree;
    tsMethod?: TsMethod = undefined;



    printAllChildren(){
        this.printChildren(this, ' ');
    }

    printChildren(tsBloc: TsTree, indent: string) {
        for (const childBloc of tsBloc.children) {
            const color = childBloc.increasesCognitiveComplexity ? 'red' : 'white';
            console.log(indent, chalk[color](childBloc.kind), 'depth', childBloc.depth, 'parent', tsBloc.kind);
            const newIndent = indent + '  ';
            this.printChildren(childBloc, newIndent);
        }
    }

}
