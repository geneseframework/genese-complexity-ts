import * as ts from 'typescript';
import { TsMethod } from './ts-method.model';
import { TsFolder } from './ts-folder.model';
import { TsFileService } from '../services/ts-file.service';
import { Stats } from './stats.model';
import { Evaluate } from '../interfaces/evaluate.interface';

export class TsFile implements Evaluate {

    cognitiveValue ?= 0;
    cyclomaticValue ?= 0;
    name ?= '';
    sourceFile?: ts.SourceFile = undefined;
    stats?: Stats = undefined;
    tsFileService: TsFileService = undefined;
    tsFolder?: TsFolder = new TsFolder();
    tsMethods?: TsMethod[] = [];

    constructor() {
        this.tsFileService = new TsFileService(this);
    }


    evaluate(): void {
        for (const method of this.tsMethods) {
            this.cognitiveValue += method.cognitiveValue;
            this.cyclomaticValue += method.cyclomaticValue;
        }
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
}
