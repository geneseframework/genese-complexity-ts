import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';
import { TsMethodService } from './ts-method.service';
import { TsFileStats } from '../models/ts-file-stats.interface';
import { Ast } from './ast.service';
import { Tools } from './tools.service';

export class TsFileService {

    private static _stats: TsFileStats = undefined;

    constructor() {
    }

    static generate(path: string, tsFolder: TsFolder = new TsFolder()): TsFile {
        const tsFile: TsFile = new TsFile();
        tsFile.sourceFile = Ast.getSourceFile(path);
        tsFile.tsFolder = tsFolder;
        tsFile.setName();
        tsFile.tsMethods = TsMethodService.generateMethods(tsFile);
        return tsFile;
    }

    static getStats(tsFile: TsFile): TsFileStats {
        if (TsFileService._stats) {
            return TsFileService._stats
        } else {
            TsFileService._stats = new TsFileStats();
            TsFileService.calculateStats(tsFile);
            TsFileService.addPercentages();
            console.log('STATS FILE ', TsFileService._stats);
            return TsFileService._stats;
        }
    }


    static calculateStats(tsFile: TsFile): void {
        TsFileService._stats.numberOfMethods = tsFile.tsMethods?.length ?? 0;
        for (const method of tsFile.tsMethods) {
            if (!method.getEvaluation().cognitiveAboveThreshold) {
                TsFileService._stats.methodsUnderCognitiveThreshold ++;
            }
            if (!method.getEvaluation().cyclomaticAboveThreshold) {
                TsFileService._stats.methodsUnderCyclomaticThreshold ++;
            }
            TsFileService._stats.barChartCognitive.addResult(method.getEvaluation().cognitiveValue);
            TsFileService._stats.barChartCyclomatic.addResult(method.getEvaluation().cyclomaticValue);
        }
    }


    static addPercentages(): void {
        TsFileService._stats.percentUnderCognitiveThreshold = Tools.percent(TsFileService._stats.methodsUnderCognitiveThreshold, TsFileService._stats.numberOfMethods);
        TsFileService._stats.percentUnderCyclomaticThreshold = Tools.percent(TsFileService._stats.methodsUnderCyclomaticThreshold, TsFileService._stats.numberOfMethods);
    }

}
