import * as ts from 'typescript';

export class Ast {


    static getChildNodes(file: ts.Node) {
        ts.forEachChild(file, child => {
            console.log('CHILD KIND ', child.kind);
            this.getChildNodes(child);
        });
    }
}
