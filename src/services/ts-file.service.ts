import { TsFolder } from '../models/ts-folder';
import { TsFile } from '../models/ts-file';
import { getSourceFile } from './file.service';

export class TsFileService {


    static generate(path: string, tsFolder: TsFolder = new TsFolder()): TsFile {
        const tsFile: TsFile = new TsFile();
        tsFile.sourceFile = getSourceFile(path);
        tsFile.tsFolder = tsFolder;
        tsFile.setName();
        tsFile.addMethods();
        return tsFile;
    }

}
