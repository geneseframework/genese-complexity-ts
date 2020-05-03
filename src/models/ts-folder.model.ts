import { TsFile } from './ts-file.model';
import { Evaluation } from './evaluation.model';
import { TsFolderService } from '../services/ts-folder.service';
import { TsFolderStats } from './ts-folder-stats.interface';

export class TsFolder {

    private _evaluation?: Evaluation = new Evaluation();
    subFolders?: TsFolder[] = [];
    parent?: TsFolder = undefined;
    path ?= '';
    stats: TsFolderStats = undefined;
    tsFiles?: TsFile[] = [];

    constructor() {
    }


    getEvaluation(): Evaluation {
        return this._evaluation ?? this.evaluate();
    }


    getStats(): TsFolderStats {
        if (!this.stats) {
            this.stats = TsFolderService.getStats(this);
        }
        return this.stats;
    }


    private evaluate(): Evaluation {
        if (!this.path) {
            return null;
        }
        let evaluation: Evaluation = new Evaluation();
        for (const file of this.tsFiles) {
            evaluation.add(file.getEvaluation());
        }
        this._evaluation = evaluation;
        return evaluation;
    }

}
