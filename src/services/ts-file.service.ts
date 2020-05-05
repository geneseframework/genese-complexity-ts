import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';
import { TsMethodService } from './ts-method.service';
import { TsFileStats } from '../models/ts-file-stats.interface';
import { Ast } from './ast.service';
import { Tools } from './tools.service';

export class TsFileService {

    private _stats: TsFileStats = undefined;
    tsFile: TsFile = undefined;

    constructor(tsFile: TsFile) {
        this.tsFile = tsFile;
    }

    static generate(path: string, tsFolder: TsFolder = new TsFolder()): TsFile {
        const tsFile: TsFile = new TsFile();
        tsFile.sourceFile = Ast.getSourceFile(path);
        tsFile.tsFolder = tsFolder;
        tsFile.setName();
        tsFile.tsMethods = TsMethodService.generateMethods(tsFile);
        return tsFile;
    }

    getStats(): TsFileStats {
        if (this._stats) {
            return this._stats
        } else {
            this._stats = new TsFileStats();
            this.calculateStats(this.tsFile);
            this.addPercentages();
            return this._stats;
        }
    }


    calculateStats(tsFile: TsFile): void {
        this._stats.numberOfMethods = tsFile.tsMethods?.length ?? 0;
        for (const method of tsFile.tsMethods) {
            if (!method.getEvaluation().cognitiveAboveThreshold) {
                this._stats.methodsUnderCognitiveThreshold ++;
            }
            if (!method.getEvaluation().cyclomaticAboveThreshold) {
                this._stats.methodsUnderCyclomaticThreshold ++;
            }
            this._stats.barChartCognitive.addResult(method.getEvaluation().cognitiveValue);
            this._stats.barChartCyclomatic.addResult(method.getEvaluation().cyclomaticValue);
        }
    }


    addPercentages(): void {
        this._stats.percentUnderCognitiveThreshold = Tools.percent(this._stats.methodsUnderCognitiveThreshold, this._stats.numberOfMethods);
        this._stats.percentUnderCyclomaticThreshold = Tools.percent(this._stats.methodsUnderCyclomaticThreshold, this._stats.numberOfMethods);
    }

}
