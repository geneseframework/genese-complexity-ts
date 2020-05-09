import * as ts from 'typescript';
import { TsMethod } from './ts-method.model';
import { TsFolder } from './ts-folder.model';
import { Evaluation } from './evaluation.model';
import { TsFileService } from '../services/ts-file.service';
import { Stats } from './stats.model';

export class TsFile {

    private _evaluation?: Evaluation = undefined;
    tsMethods?: TsMethod[] = [];
    name ?= '';
    sourceFile?: ts.SourceFile = undefined;
    stats?: Stats = undefined;
    tsFileService: TsFileService = undefined;
    tsFolder?: TsFolder = new TsFolder();

    constructor() {
        this.tsFileService = new TsFileService(this);
    }


    getEvaluation(): Evaluation {
        return this._evaluation ?? this.evaluate();
    }


    getStats(): Stats {
        if (!this.stats) {
            this.stats = this.tsFileService.getStats(this);
        }
        return this.stats;
    }


    setName(): void {
        this.name = this.sourceFile.fileName;
    }


    private evaluate(): Evaluation {
        let evaluation: Evaluation = new Evaluation();
        for (const method of this.tsMethods) {
            evaluation = evaluation.add(method.getEvaluation());
        }
        this._evaluation = evaluation;
        return evaluation;
    }
}
