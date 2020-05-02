import * as ts from 'typescript';
import { TsMethod } from './ts-method.model';
import { TsFolder } from './ts.folder.model';
import { Evaluation } from './evaluation.model';

export class TsFile {

    private _evaluation?: Evaluation = undefined;
    tsMethods?: TsMethod[] = [];
    name ?= '';
    sourceFile?: ts.SourceFile = undefined;
    tsFolder?: TsFolder = new TsFolder();

    constructor() {
    }


    getEvaluation(): Evaluation {
        return this._evaluation ?? this.evaluate();
    }


    setName(): void {
        this.name = this.sourceFile.fileName;
    }


    private evaluate(): Evaluation {
        let evaluation: Evaluation = new Evaluation();
        for (const method of this.tsMethods) {
            evaluation.add(method.getEvaluation());
        }
        this._evaluation = evaluation;
        return evaluation;
    }
}
