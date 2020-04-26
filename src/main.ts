import * as ts from 'typescript';
import * as fse from 'fs-extra';
import * as Handlebars from 'handlebars';
import { Walker } from './features/walker';
import { ReportService } from './features/report.service';
import { getFileName } from './features/file.service';

const appRootPath = require('app-root-path');

export class Main {

    private appRoot = appRootPath.toString();                   // Root of the app

    constructor() {}

    process(): void {
        this.evaluateFile(`${this.appRoot}/src/mocks/methods.mock.ts`);
        this.generateReport();
    }


    evaluateFile(pathFile: string) {
        const fileName = getFileName(pathFile);
        console.log('FILE NAME fileName ', fileName);
        const sourceFile = ts.createSourceFile(fileName,
            fse.readFileSync(pathFile, 'utf8'),
            ts.ScriptTarget.Latest);
        const walker = new Walker(sourceFile);
        walker.walk();
    }



    generateReport(): void {
        const reportService = new ReportService();
        reportService.generate();
    }


    processFolder(): Main {
        return this;
    }


    processFiles(): Main {
        return this;
    }


    processFile(): void {
    }


    processMethods(): Main {
        return this;
    }


    processMethod(): void {

    }

}
