import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { FileWalker } from './features/fileWalker';
import { ReportService } from './features/report.service';
import { getFilename, getSourceFile, getTsFiles } from './features/file.service';
import { Ast } from './features/ast.service';
import { TsTree } from './models/ts-tree.model';

const appRootPath = require('app-root-path');

export class Main {

    private appRoot = appRootPath.toString();                   // Root of the app

    constructor() {}

    process(): void {
        console.log('START CALCULATION');
        this.parseNodes();
        // this.evaluateFolder(`${this.appRoot}/src/mocks/`);
        // // this.evaluateFile(`${this.appRoot}/src/mocks/first.mock.ts`);
        // this.generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }

    parseNodes(): void {
        const sourceFile = getSourceFile(`${this.appRoot}/src/mocks/ast.mock.ts`);
        // const tree = Ast.getTree(sourceFile);
        // console.log('TREE PN ', tree);
        // tree.node = sourceFile;
        // console.log('TREE TRACE', tree.getTrace());
        const tree = Ast.parseChildNodes(sourceFile, (childNode) => {
            const name = Ast.getSyntaxKindName(childNode);
            console.log('CHILD KIND ', childNode.kind, ' / ', name);
        });
        console.log('TREE  = ', tree);
        // console.log('NODE length = ', nodes.length);
        // console.log('NODE 1 = ', nodes[1]);
    }


    evaluateFolder(dirPath: string): void {
        const tsFiles: string[] = getTsFiles(dirPath);
        console.log('TS FILES', tsFiles);
        for (const file of tsFiles) {
            this.evaluateFile(file);
        }
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
