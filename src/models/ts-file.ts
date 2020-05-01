import * as ts from 'typescript';
import { TsMethod } from './ts-method';
import { TsFolder } from './ts-folder';
import { TsTree } from './ts-tree.model';
import { getFilename } from '../features/file.service';

export class TsFile {

    methods?: TsMethod[] = [];
    sourceFile?: ts.SourceFile = undefined;
    tsFolder?: TsFolder = new TsFolder();
    tsTree?: TsTree = new TsTree();

    constructor() {
    }
}
