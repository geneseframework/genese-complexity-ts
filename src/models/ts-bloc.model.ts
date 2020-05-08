import * as ts from 'typescript';
import { TsMethod } from './ts-method.model';

export class TsBloc {

    children?: TsBloc[] = [];
    depth ?= 0;
    kind ?= '';
    node?: ts.Node;
    parent?: TsBloc;
    tsMethod?: TsMethod = undefined;

    printAllChildren(){
        this.printChildren(this, ' ');
    }

    printChildren(tsBloc: TsBloc, indent: string) {
        for (const childBloc of tsBloc.children) {
            console.log(indent, childBloc.kind, 'depth', childBloc.depth, 'parent', tsBloc.kind);
            const newIndent = indent + '  ';
            this.printChildren(childBloc, newIndent);
        }
    }

}
