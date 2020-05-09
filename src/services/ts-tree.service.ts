import * as ts from 'typescript';
import { Ast } from './ast.service';
import { TsTree } from '../models/ts-tree.model';
import { TsMethod } from '../models/ts-method.model';
import { ComplexityService as CS } from './complexity.service';


export class TsTreeService {

    static generateTree(tsMethod: TsMethod): TsTree {
        let tsTree: TsTree = new TsTree();
        tsTree.node = tsMethod.node;
        tsTree.depth = 0;
        tsTree.tsMethod = tsMethod;
        tsTree.kind = Ast.getType(tsMethod.node);
        tsTree = TsTreeService.addTreeToChildren(tsTree)
        // tsTree = Ast.getBloc(tsTree);
        return tsTree;
    }


    // static getChildren(tsTree: TsTree): TsTree[] {
    //     return TsTreeService.addTreeToChildren(tsTree);
    // }


    // static getBloc(tsTree: TsTree): TsTree {
    //     return TsTreeService.addTreeToChildren(tsTree);
    // }


    static addTreeToChildren(tsTree: TsTree): TsTree {
        const depth: number = tsTree.depth;
        ts.forEachChild(tsTree.node, (childNode: ts.Node) => {
            const newBloc = new TsTree();
            childNode.parent = tsTree.node;
            newBloc.node = childNode;
            newBloc.depth = CS.increaseDepth(childNode, depth);
            newBloc.tsMethod = tsTree.tsMethod;
            newBloc.parent = tsTree;
            newBloc.kind = Ast.getType(childNode);
            newBloc.increasesCognitiveComplexity = CS.increasesCognitiveComplexity(newBloc);
            tsTree.children.push(TsTreeService.addTreeToChildren(newBloc));
        });
        return tsTree;
    }
}
