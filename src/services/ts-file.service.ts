import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';
import { TsMethodService } from './ts-method.service';
import { TsFileStats } from '../models/ts-file-stats.interface';
import { Ast } from './ast.service';
import { Tools } from './tools.service';
import { TsMethod } from '../models/ts-method.model';
import { EvaluationStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';
import { Evaluation } from '../models/evaluation.model';

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
            this.incrementStats(method);
        }
    }


    incrementStats(method: TsMethod): void {
        const evaluation = method.getEvaluation();
        this.incrementMethodsByStatus(evaluation, ComplexityType.COGNITIVE);
        this.incrementMethodsByStatus(evaluation, ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(method.getEvaluation().cognitiveValue);
        this._stats.barChartCyclomatic.addResult(method.getEvaluation().cyclomaticValue);
    }


    incrementMethodsByStatus(evaluation: Evaluation, type: ComplexityType): void {
        const status = type === ComplexityType.COGNITIVE ? evaluation.cognitiveStatus : evaluation.cyclomaticStatus;
        switch (status) {
            case EvaluationStatus.CORRECT:
                this._stats.methodsByStatus[type].correct ++;
                break;
            case EvaluationStatus.ERROR:
                this._stats.methodsByStatus[type].error ++;
                break;
            case EvaluationStatus.WARNING:
                this._stats.methodsByStatus[type].warning ++;
                break;
            default:
                break;
        }
    }


    addPercentages(): void {
        this._stats.percentUnderCognitiveThreshold = Tools.percent(this._stats.numberOfMethods - this._stats.methodsByStatus.cognitive.error, this._stats.numberOfMethods);
        this._stats.percentUnderCyclomaticThreshold = Tools.percent(this._stats.numberOfMethods - this._stats.methodsByStatus.cyclomatic.error, this._stats.numberOfMethods);
    }

}
