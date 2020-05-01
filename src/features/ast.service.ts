import * as ts from 'typescript';
import { TsTree } from '../models/ts-tree.model';

export class Ast {

    static getTree(node: ts.Node, tree?: TsTree): TsTree {
        const newTree = tree ?? new TsTree()
        newTree.syntaxKindName = Ast.getSyntaxKindName(node);
        Ast.parseChildNodes(node, childNode => {
            const childTree: TsTree = new TsTree();
            childTree.node = childNode;
            childTree.syntaxKindName = Ast.getSyntaxKindName(childNode);
            newTree.children.push(childTree);
            this.getTree(childNode, childTree);
        });
        return newTree;
    }


    static parseChildNodes(node: ts.Node, action?: (node: ts.Node) => any): TsTree {
        const tree = new TsTree();
        tree.syntaxKindName = Ast.getSyntaxKindName(node);
        ts.forEachChild(node, (childNode: ts.Node) => {
            if (action) {
                action(childNode);
            }
            childNode.parent = node;
            const childTree: TsTree = this.parseChildNodes(childNode, action);
            tree.children.push(childTree);
        });
        tree.node = node;
        return tree;
    }


    static getSyntaxKindName(node: ts.Node): string {
        return Object.keys(ts.SyntaxKind).find(key => ts.SyntaxKind[key] === node.kind);
    }


    static getPreviousNode(node: ts.Node, parentNode: ts.Node): ts.Node {
        return node;
    }
}
