import { TsFile } from './ts-file.model';
import { TsFolderService } from '../services/ts-folder.service';
import { Stats } from './stats.model';
import { Evaluate } from '../interfaces/evaluate.interface';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import { Ast } from '../services/ast.service';
import { getFilename } from '../services/file.service';
import { ComplexitiesByStatusService } from '../services/complexities-by-status.service';

export class TsFolder implements Evaluate {

    cognitiveValue ?= 0;
    complexitiesByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();
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
        console.log('FOLDER CPX START', this.complexitiesByStatus);
        for (const file of this.tsFiles) {
            console.log('FILE NAME filename', file.name);
            this.cognitiveValue += file.cognitiveValue;
            this.cyclomaticValue += file.cyclomaticValue;
            console.log('FOLDER FILE CPX', file.complexitiesByStatus);
            this.complexitiesByStatus = this.complexitiesByStatus.add(file.complexitiesByStatus);
        }
        console.log('FOLDER CPX END', this.complexitiesByStatus);
    }

}
