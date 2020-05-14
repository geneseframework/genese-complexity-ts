import * as ts from 'typescript';
import { TsFolder } from './models/ts-folder.model';
import { TsFolderService } from './services/ts-folder.service';
import { TsFile } from './models/ts-file.model';
import { TsFileService } from './services/ts-file.service';
import { Options } from './models/options';
import { ReportsService } from './services/reports.service';
import { createOutDir } from './services/file.service';

const appRootPath = require('app-root-path');
const appRoot = appRootPath.toString();

export class Process {

    private tsFolder?: TsFolder = new TsFolder();

    constructor() {
    }

    start(options: any): void {
        console.log('START CALCULATION');
        // this.getDebugReport();
        this.setOptions(options)
            .createOutDir()
            .generateTree()
            .generateReports();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }


    setOptions(options: any): Process {
        Options.setOptions(options);
        // console.log('OPTIONSSS', Options)
        return this;
    }

    createOutDir(): Process {
        createOutDir();
        return this;
    }

    getDebugReport() {
        const tsFile: TsFile = TsFileService.generateTree(`${appRoot}/src/mocks/ast.mock.ts`);
        for (const method of tsFile.tsMethods) {
            const tree = method.tsTree;
            // tree.printAllChildren();
        }
    }


    generateTree(): Process {
        this.tsFolder = TsFolderService.generateTree(Options.pathFolderToAnalyse, 'ts');
        return this;
    }


    generateReports(): void {
        ReportsService.generateAllReports(this.tsFolder);
    }

}
