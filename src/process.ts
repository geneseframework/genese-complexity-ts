import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { ReportService } from './services/report.service';
import { TsFolder } from './models/ts.folder.model';
import { TsFolderService } from './services/ts-folder.service';
import { TsFile } from './models/ts-file.model';
import { TsFileService } from './services/ts-file.service';
import { Options } from './models/options';

const appRootPath = require('app-root-path');
const appRoot = appRootPath.toString();

export class Process {

    private readonly path: string;
    private tsFolder?: TsFolder = new TsFolder();

    constructor(path: string) {
        this.path = path;
    }

    start(options: any): void {
        console.log('START CALCULATION');
        // this.getDebugReport();
        this.setOptions(options)
            .createOutDir()
            .setTsFolder()
            .generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }


    setOptions(options: any): Process {
        Options.setOptions(options);
        return this;
    }


    getDebugReport() {
        const tsFile: TsFile = TsFileService.generate(`${appRoot}/src/mocks/ast.mock.ts`);
        const evaluation = tsFile.getEvaluation();
        // console.log('FILE EVALUATION', evaluation);
    }


    setTsFolder(): Process {
        this.tsFolder = TsFolderService.generate(this.path, 'ts');
        return this;
    }


    generateReport(): void {
        const reportService: ReportService = new ReportService();
        reportService.generateReportOfTsFolder(this.tsFolder);
    }


    createOutDir(): Process {
        if (fs.existsSync(Options.outDir)) {
            fs.emptyDirSync(Options.outDir);
        } else {
            fs.mkdirsSync(Options.outDir);
        }
        return this;
    }
}
