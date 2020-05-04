import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';
import { TsMethodService } from './ts-method.service';
import { TsFileStats } from '../models/ts-file-stats.interface';
import { Ast } from './ast.service';
import { Point } from '../models/point.model';

export class TsFileService {


    static generate(path: string, tsFolder: TsFolder = new TsFolder()): TsFile {
        const tsFile: TsFile = new TsFile();
        tsFile.sourceFile = Ast.getSourceFile(path);
        tsFile.tsFolder = tsFolder;
        tsFile.setName();
        tsFile.tsMethods = TsMethodService.generateMethods(tsFile);
        return tsFile;
    }


    static getStats(tsFile: TsFile): TsFileStats {
        let methodsUnderCyclomaticThreshold = 0;
        let methodsUnderCognitiveThreshold = 0;
        let methodsByCognitiveCpx: Point[] = [];
        let methodsByCyclomaticCpx: Point[] = [];
        for (const method of tsFile.tsMethods) {
            if (!method.getEvaluation().cyclomaticAboveThreshold) {
                methodsUnderCyclomaticThreshold ++;
            }
            if (!method.getEvaluation().cognitiveAboveThreshold) {
                methodsUnderCognitiveThreshold ++;
            }

        }
        const stats: TsFileStats = {
            numberOfMethods: tsFile.tsMethods?.length ?? 0,
            methodsUnderCognitiveThreshold: methodsUnderCognitiveThreshold,
            methodsUnderCyclomaticThreshold: methodsUnderCyclomaticThreshold
        }
        return stats;
    }

}
