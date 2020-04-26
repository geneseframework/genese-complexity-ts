import * as ts from 'typescript';
import * as fse from 'fs-extra';
import * as Handlebars from 'handlebars';
import { Walker } from './features/walker';
import { ReportService } from './features/report.service';

const appRootPath = require('app-root-path');

export class Main {

    private appRoot = appRootPath.toString();                   // Root of the app
    private reportTemplate: HandlebarsTemplateDelegate;

    constructor() {}

    process(): void {
        console.log(`appRoot ${this.appRoot}`);
        const reportService = new ReportService();
        reportService.generate();
        const sourceFile = ts.createSourceFile('methods.mock.ts',
            fse.readFileSync(`${this.appRoot}/src/mocks/methods.mock.ts`, 'utf8'),
            ts.ScriptTarget.Latest);
        // this.reportTemplate = Handlebars.compile(fse.readFileSync(`${this.appRoot}/src/mocks/methods.mock.ts`, 'utf8'));
        // console.log('template ', this.reportTemplate);
        // this.reportTemplate({score: 'zzz'});
        const walker = new Walker(sourceFile);
        walker.walk();
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
