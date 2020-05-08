import * as fs from 'fs-extra';
import * as ts from 'typescript';
import { ComplexityService as CS } from '../services/complexity.service';
import { TsBloc } from '../models/ts-bloc.model';
import { getFilename } from './file.service';

export class Ast {


    static getSourceFile(path: string): ts.SourceFile {
        return ts.createSourceFile(getFilename(path), fs.readFileSync(path, 'utf-8'), ts.ScriptTarget.Latest);
    }


    static getBloc(tsBloc: TsBloc): TsBloc {
        return Ast.parseChildNodes(tsBloc);
    }


    static parseChildNodes(tsBloc: TsBloc): TsBloc {
        const depth: number = tsBloc.depth;
        ts.forEachChild(tsBloc.node, (childNode: ts.Node) => {
            const newBloc = new TsBloc();
            childNode.parent = tsBloc.node;
            newBloc.node = childNode;
            newBloc.depth = CS.increaseDepth(childNode, depth);
            newBloc.tsMethod = tsBloc.tsMethod;
            newBloc.parent = tsBloc;
            newBloc.kind = Ast.getType(childNode);
            tsBloc.children.push(this.parseChildNodes(newBloc));
        });
        return tsBloc;
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
