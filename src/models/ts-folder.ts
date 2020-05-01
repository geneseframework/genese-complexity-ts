import { TsFile } from './ts-file';

export class TsFolder {

    children?: TsFolder[] = [];
    parent?: TsFolder = undefined;
    path ?= '';
    tsFiles?: TsFile[] = [];
}
