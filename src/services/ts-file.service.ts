import { TsFolder } from '../models/ts.folder.model';
import { TsFile } from '../models/ts-file.model';
import { getSourceFile } from './file.service';
import { TsMethodService } from './ts-method.service';

export class TsFileService {


    static generate(path: string, tsFolder: TsFolder = new TsFolder()): TsFile {
        const tsFile: TsFile = new TsFile();
        tsFile.sourceFile = getSourceFile(path);
        tsFile.tsFolder = tsFolder;
        tsFile.setName();
        tsFile.tsMethods = TsMethodService.generateMethods(tsFile);
        return tsFile;
    }

}
