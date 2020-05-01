import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { TsFile } from './ts-file';

export class TsFolder {

    subFolders?: TsFolder[] = [];
    parent?: TsFolder = undefined;
    path ?= '';
    tsFiles?: TsFile[] = [];

    constructor() {
    }


}
