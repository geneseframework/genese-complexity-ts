import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { FileWalker } from './features/fileWalker';
import { ReportService } from './features/report.service';
import { getAllFiles, getFileName } from './features/file.service';

const appRootPath = require('app-root-path');

export class Main {

    private appRoot = appRootPath.toString();                   // Root of the app

    constructor() {}

    process(): void {
        console.log('START CALCULATION');
        this.evaluateFolder(`${this.appRoot}/src/mocks/`);
        this.evaluateFile(`${this.appRoot}/src/mocks/first.mock.ts`);
        this.generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }


    evaluateFolder(path: string): void {
        const allFiles: string[] = getAllFiles(path);
        console.log('ALL FILES', allFiles)
    }



    evaluateFile(pathFile: string): void {
        const fileName = getFileName(pathFile);
        const sourceFile = ts.createSourceFile(fileName,
            fs.readFileSync(pathFile, 'utf8'),
            ts.ScriptTarget.Latest);
        const walker = new FileWalker(sourceFile);
        walker.walk();
    }


    generateReport(): void {
        const reportService = ReportService.getInstance();
        reportService.generate();
    }
}
