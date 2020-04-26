import { NgCyclomaticComplexityWalker, Walker } from '../rules/ngCyclomaticComplexityRule';
import * as ts from 'typescript';
import * as fse from 'fs-extra';

const appRootPath = require('app-root-path');

export class Main {

    private source = __dirname;
    private appRoot = appRootPath.toString();                   // Root of the app

    constructor() {}

    process(): void {
        console.log(`SOURCE ${this.source}`);
        console.log(`appRoot ${this.appRoot}`);
        console.log()
        const sourceFile = ts.createSourceFile('methods.mock.ts',
            fse.readFileSync(`${this.appRoot}/mocks/methods.mock.ts`, 'utf8'),
            ts.ScriptTarget.Latest);
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
