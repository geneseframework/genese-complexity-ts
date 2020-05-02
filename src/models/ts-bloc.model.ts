import { TsMethod } from './ts-method.model';
import { TsTree } from './ts-tree.model';

export class TsBloc extends TsTree {

    depth ?= 0;
    parent?: TsBloc;
    children?: TsBloc[] = [];
    tsMethod?: TsMethod = undefined;
}
