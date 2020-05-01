import { TsFile } from './ts-file';
import { getTypescriptFiles } from '../services/file.service';
import { Evaluation } from './evaluation';

export class TsFolder {

    private _evaluation?: Evaluation = new Evaluation();
    private _report?: Evaluation[] = [];
    subFolders?: TsFolder[] = [];
    parent?: TsFolder = undefined;
    path ?= '';
    tsFiles?: TsFile[] = [];

    constructor() {
    }


    getEvaluation(): Evaluation {
        return this._evaluation ?? this.evaluate();
    }



    private evaluate(): Evaluation {
        if (!this.path) {
            return null;
        }
        const tsFiles: string[] = getTypescriptFiles(this.path);
        console.log('TS FILES', tsFiles);
        let evaluation: Evaluation = new Evaluation();
        for (const file of this.tsFiles) {
            evaluation.add(file.getEvaluation());
        }
        this._evaluation = evaluation;
        return evaluation;
    }


    getReport(): Evaluation[] {
        return this._report ?? this.addReport();
    }


    private addReport(): Evaluation[] {
        const report: Evaluation[] = [];
        for (const tsFile of this.tsFiles) {
            console.log('FILE NAME ', tsFile.sourceFile.fileName);
            for (const tsMethod of tsFile.tsMethods) {
                report.push(tsMethod.getEvaluation());
            }
        }
        this._report = report;
        return report;
    }
}
