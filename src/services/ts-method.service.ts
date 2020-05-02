import * as ts from 'typescript';
import { TsFile } from '../models/ts-file.model';
import { TsMethod } from '../models/ts-method.model';

export class TsMethodService {


    static generateMethods(tsFile: TsFile): TsMethod[] {
        const methods: TsMethod[] = [];
        ts.forEachChild(tsFile.sourceFile, function cb(node) {
            if (node.kind === ts.SyntaxKind.MethodDeclaration) {
                const newMethod: TsMethod = new TsMethod(node);
                newMethod.tsFile = tsFile;
                methods.push(newMethod);
            }
            ts.forEachChild(node, cb);
        });
        return methods;
    }

}
