import * as ts from 'typescript';
import { TsMethod } from './ts-method.model';
const chalk = require('chalk');

export class TsBloc {

    children?: TsBloc[] = [];
    depth ?= 0;
    increasesCognitiveComplexity = false;
    kind ?= '';
    node?: ts.Node;
    parent?: TsBloc;
    tsMethod?: TsMethod = undefined;

    printAllChildren(){
        this.printChildren(this, ' ');
    }

    printChildren(tsBloc: TsBloc, indent: string) {
        for (const childBloc of tsBloc.children) {
            const color = childBloc.increasesCognitiveComplexity ? 'red' : 'white';
            console.log(indent, chalk[color](childBloc.kind), 'depth', childBloc.depth, 'parent', tsBloc.kind);
            const newIndent = indent + '  ';
            this.printChildren(childBloc, newIndent);
        }
    }

}
