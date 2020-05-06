import * as fs from 'fs-extra';
import * as ts from 'typescript';
import { ComplexityService as CS } from '../services/complexity.service';
import { TsTree } from '../models/ts-tree.model';
import { TsBloc } from '../models/ts-bloc.model';
import { getFilename } from './file.service';

export class Ast {


    static getSourceFile(path: string): ts.SourceFile {
        return ts.createSourceFile(getFilename(path), fs.readFileSync(path, 'utf-8'), ts.ScriptTarget.Latest);
    }


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
        tree.syntaxKindName = Ast.getType(tree.node);
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


    static getType(node: ts.Node): string {
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


    static isBinary(node: ts.Node): boolean {
        return node?.kind === ts.SyntaxKind.BinaryExpression ?? false;
    }


    static isLogicDoor(node: ts.Node): boolean {
        return (node?.['operatorToken']?.kind === ts.SyntaxKind.AmpersandAmpersandToken
            || node?.['operatorToken']?.kind === ts.SyntaxKind.BarBarToken)
            ?? false;
    }


    static isOrTokenBetweenBinaries(node: ts.Node): boolean {
        return (node?.['operatorToken']?.kind === ts.SyntaxKind.BarBarToken
            && node?.['left']?.kind === ts.SyntaxKind.BinaryExpression
            && node?.['right']?.kind === ts.SyntaxKind.BinaryExpression)
            ?? false;
    }


    static isSameOperatorToken(firstNode: ts.Node, secondNode: ts.Node): boolean {
        return firstNode?.['operatorToken']?.kind === secondNode?.['operatorToken']?.kind ?? false;
    }
}
