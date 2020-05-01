import * as ts from 'typescript';
import * as utils from 'tsutils';
import { increasesComplexity } from '../services/complexity.service';
import { TsFile } from './ts-file';
import { TsTree } from './ts-tree.model';

export class TsMethod {

    node: ts.Node = undefined;
    _cognitiveComplexity = 0;
    currentDepth = 0;
    cyclomaticComplexity = 0;
    tsFile?: TsFile = new TsFile();
    tsTree?: TsTree = new TsTree();

    constructor(node: ts.Node) {
        this.node = node;
        // this.calculateCognitiveComplexity(node);
    }


    getCognitiveComplexity() {
        return this._cognitiveComplexity;
    }


    calculateCognitiveComplexity(ctx): void {
        let complexity = 0;
        let depthLevel = 0;
        ts.forEachChild(ctx, function cb(node) {
            if (utils.isFunctionWithBody(node)) {
                depthLevel ++;
                complexity += depthLevel;
                ts.forEachChild(node, cb);
            } else {
                if (increasesComplexity(node, 'cognitive')) {
                    depthLevel ++;
                    complexity += depthLevel;
                }
                ts.forEachChild(node, cb);
            }
        });
        this._cognitiveComplexity = complexity;
    }

}
