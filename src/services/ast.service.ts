import * as ts from 'typescript';
import { TsTree } from '../models/ts-tree.model';
import { TsBloc } from '../models/ts-bloc.model';

export class Ast {

    static getTree(node: ts.Node): TsTree {
        const tree = new TsTree();
        tree.node = node;
        return Ast.parseChildNodes(tree);
    }

    static getBloc(tsBloc: TsBloc): TsBloc {
        return Ast.parseChildNodes(tsBloc);
    }

    static parseChildNodes(tree: TsBloc): TsBloc;
    static parseChildNodes(tree: TsTree): TsTree;
    static parseChildNodes(tree: any): TsTree | TsBloc {
        tree.syntaxKindName = Ast.getSyntaxKindName(tree.node);
        ts.forEachChild(tree.node, (childNode: ts.Node) => {
            const newTree = tree.depth ? new TsBloc() : new TsTree();
            childNode.parent = tree.node;
            newTree.node = childNode;
            const childTree = this.parseChildNodes(newTree as any);
            if (tree.depth) {
                childTree.depth = tree.depth++;
                childTree.tsMethod = tree.tsMethod;
            }
            tree.children.push(childTree);
        });
        // tree.node = node;
        return tree;
    }


    static getSyntaxKindName(node: ts.Node): string {
        return node ? ts.SyntaxKind[node.kind] : '';
    }


    static getMethodName(node: ts.Node): string {
        if (node?.kind === ts.SyntaxKind.MethodDeclaration) {
                return node?.['name']?.['escapedText'] ?? '';
        } else {
            return '';
        }
    }


    static getPreviousNode(node: ts.Node, parentNode: ts.Node): ts.Node {
        return node;
    }
}
