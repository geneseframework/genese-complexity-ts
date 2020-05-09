import { TsFile } from './ts-file.model';
import { TsFolderService } from '../services/ts-folder.service';
import { Stats } from './stats.model';
import { Evaluate } from '../interfaces/evaluate.interface';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import { Ast } from '../services/ast.service';
import { getFilename } from '../services/file.service';

export class TsFolder implements Evaluate {

    cognitiveValue ?= 0;
    complexitiesByStatus?: ComplexitiesByStatus = {};
    cyclomaticValue ?= 0;
    name ?= '';
    numberOfFiles ?= 0;
    numberOfMethods ?= 0;
    parent?: TsFolder = undefined;
    path ?= '';
    stats: Stats = undefined;
    subFolders?: TsFolder[] = [];
    tsFiles?: TsFile[] = [];
    tsFolderService?: TsFolderService = undefined;

    constructor() {
        this.tsFolderService = new TsFolderService(this);
    }


    getStats(): Stats {
        if (!this.stats) {
            this.stats = this.tsFolderService.getStats(this).plugChartHoles();
        }
        return this.stats;
    }


    evaluate(): void {
        console.log('EVL FOLDER', this.path)
        for (const file of this.tsFiles) {
            this.cognitiveValue += file.cognitiveValue;
            this.cyclomaticValue += file.cyclomaticValue;
        }
    }

}
