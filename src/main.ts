import * as ts from 'typescript';
import * as fse from 'fs-extra';
import { FileWalker } from './features/fileWalker';
import { ReportService } from './features/report.service';
import { getFileName } from './features/file.service';

const appRootPath = require('app-root-path');

export class Main {

    private appRoot = appRootPath.toString();                   // Root of the app

    constructor() {}

    process(): void {
        console.log('START CALCULATION');
        this.evaluateFile(`${this.appRoot}/src/mocks/methods.mock.ts`);
        this.generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }


    evaluateFile(pathFile: string) {
        const fileName = getFileName(pathFile);
        const sourceFile = ts.createSourceFile(fileName,
            fse.readFileSync(pathFile, 'utf8'),
            ts.ScriptTarget.Latest);
        const walker = new FileWalker(sourceFile);
        walker.walk();
    }


    generateReport(): void {
        const reportService = ReportService.getInstance();
        reportService.generate();
    }
}
