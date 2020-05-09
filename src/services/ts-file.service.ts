import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';
import { TsMethodService } from './ts-method.service';
import { Ast } from './ast.service';
import { TsMethod } from '../models/ts-method.model';
import { EvaluationStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';
import { Evaluation } from '../models/evaluation.model';
import { StatsService } from './stats.service';
import { Stats } from '../models/stats.model';

export class TsFileService extends StatsService{

    protected _stats: Stats = undefined;
    tsFile: TsFile = undefined;

    constructor(tsFile: TsFile) {
        super();
        this.tsFile = tsFile;
    }

    static generateTree(path: string, tsFolder: TsFolder = new TsFolder()): TsFile {
        const tsFile: TsFile = new TsFile();
        tsFile.sourceFile = Ast.getSourceFile(path);
        tsFile.tsFolder = tsFolder;
        tsFile.setName();
        tsFile.tsMethods = TsMethodService.generateTree(tsFile);
        return tsFile;
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
        const status = (type === ComplexityType.COGNITIVE) ? evaluation.cognitiveStatus : evaluation.cyclomaticStatus;
        switch (status) {
            case EvaluationStatus.CORRECT:
                this._stats.numberOfMethodsByStatus[type].correct ++;
                break;
            case EvaluationStatus.ERROR:
                this._stats.numberOfMethodsByStatus[type].error ++;
                break;
            case EvaluationStatus.WARNING:
                this._stats.numberOfMethodsByStatus[type].warning ++;
                break;
            default:
                break;
        }
    }

}
