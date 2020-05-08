import * as ts from 'typescript';
import { TsMethod } from './ts-method.model';

export class TsBloc {

    children?: TsBloc[] = [];
    depth ?= 0;
    parent?: TsBloc;
    tsMethod?: TsMethod = undefined;

    syntaxKindName?: string;
    node?: ts.Node;
}
