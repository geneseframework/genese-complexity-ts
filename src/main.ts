import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { FileWalker } from './features/fileWalker';
import { ReportService } from './features/report.service';
import { getFilename, getSourceFile, getTsFiles } from './features/file.service';
import { Ast } from './features/ast.service';
import { TsFolder } from './models/ts-folder';

const appRootPath = require('app-root-path');

export class Main {

    private appRoot = appRootPath.toString();                   // Root of the app
    private tsFolder?: TsFolder = new TsFolder();

    constructor() {}

    process(): void {
        console.log('START CALCULATION');
        this.getTree()
            .evaluateFolder(`${this.appRoot}/src/mocks/`)
            .generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }

    getTree(): Main {
        const sourceFile = getSourceFile(`${this.appRoot}/src/mocks/ast.mock.ts`);
        const tree = Ast.getTree(sourceFile);
        console.log('TREE 0 = ', tree.children[0]);
        return this;
    }


    evaluateFolder(dirPath: string): Main {
        const tsFiles: string[] = getTsFiles(dirPath);
        console.log('TS FILES', tsFiles);
        for (const file of tsFiles) {
            this.evaluateFile(file);
        }
        return this;
    }



    evaluateFile(pathFile: string): void {
        const fileName = getFilename(pathFile);
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
