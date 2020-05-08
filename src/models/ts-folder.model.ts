import { TsFile } from './ts-file.model';
import { Evaluation } from './evaluation.model';
import { TsFolderService } from '../services/ts-folder.service';
import { TsFolderStats } from './ts-folder-stats.interface';

export class TsFolder {

    private _evaluation?: Evaluation = undefined;
    parent?: TsFolder = undefined;
    path ?= '';
    stats: TsFolderStats = undefined;
    subFolders?: TsFolder[] = [];
    tsFiles?: TsFile[] = [];
    tsFolderService?: TsFolderService = undefined;

    constructor() {
        this.tsFolderService = new TsFolderService(this);
    }


    getEvaluation(): Evaluation {
        return this._evaluation ?? this.evaluate();
    }


    getStats(): TsFolderStats {
        if (!this.stats) {
            this.stats = this.tsFolderService.getStats(this).plugChartHoles();
        }
        return this.stats;
    }


    private evaluate(): Evaluation {
        let evaluation: Evaluation = new Evaluation();
        for (const file of this.tsFiles) {
            evaluation = evaluation.add(file.getEvaluation());
        }
        this._evaluation = evaluation;
        return evaluation;
    }

}
