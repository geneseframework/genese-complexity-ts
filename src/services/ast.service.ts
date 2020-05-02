import * as ts from 'typescript';
import { ComplexityService as CS } from '../services/complexity.service';
import { TsTree } from '../models/ts-tree.model';
import { TsBloc } from '../models/ts-bloc.model';

export class Ast {

    static getTree(node: ts.Node): TsTree {
        const tree = new TsTree();
        tree.node = node;
        return Ast.parseChildNodes(tree);
    }

    static getBloc(tsBloc: TsBloc): TsBloc {
        return Ast.parseChildNodes(tsBloc, true);
    }

    static parseChildNodes(tree: TsBloc, isBloc?: true): TsBloc;
    static parseChildNodes(tree: TsTree, isBloc?: false): TsTree;
    static parseChildNodes(tree: any, isBloc?: boolean): TsTree | TsBloc;
    static parseChildNodes(tree: any, isBloc = false): TsTree | TsBloc {
        tree.syntaxKindName = Ast.getSyntaxKindName(tree.node);
        const depth: number = isBloc ? tree.depth : undefined;
        ts.forEachChild(tree.node, (childNode: ts.Node) => {
            const newTree = isBloc ? new TsBloc() : new TsTree() as TsBloc;
            childNode.parent = tree.node;
            newTree.node = childNode;
            if (isBloc) {
                newTree.depth = CS.increaseDepth(childNode, depth);
                newTree.tsMethod = tree.tsMethod;
                newTree.parent = tree;
            }
            const childTree = this.parseChildNodes(newTree, isBloc);
            tree.children.push(childTree);
        });
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
