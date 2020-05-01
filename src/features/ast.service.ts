import * as ts from 'typescript';

export class Ast {


    static parseChildNodes(node: ts.Node, action?: (node: ts.Node) => any): ts.Node[] {
        const nodes: ts.Node[] = [];
        ts.forEachChild(node, (child: ts.Node) => {
            if (action) {
                action(child);
            }
            nodes.push(child);
            this.parseChildNodes(child, action);
        });
        return nodes;
    }


    static getSyntaxKindName(node: ts.Node): string {
        return Object.keys(ts.SyntaxKind).find(key => ts.SyntaxKind[key] === node.kind);
    }
}
