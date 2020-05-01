import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { FileWalker } from './features/fileWalker';
import { ReportService } from './features/report.service';
import { getFilename, getSourceFile, createTsFolder, getTypescriptFiles } from './features/file.service';
import { Ast } from './features/ast.service';
import { TsFolder } from './models/ts-folder';
import { TsTree } from './models/ts-tree.model';


export class Process {

    private readonly path: string;
    private tree: TsTree = new TsTree();
    private tsFolder?: TsFolder = new TsFolder();

    constructor(path: string) {
        this.path = path;
        console.log('PATH this.path', this.path);
    }

    start(): void {
        console.log('START CALCULATION');
        // this.getTree()
        this.setTsFolder()
            .generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }

    getTree(): Process {
        console.log('PATH this.path', this.path);
        const sourceFile = getSourceFile(this.path);
        this.tree = Ast.getTree(sourceFile);
        // console.log('TREE 0 = ', this.tree.children[0]);
        return this;
    }


    setTsFolder(): Process {
        this.tsFolder = createTsFolder(this.path, 'ts');
        console.log('TS FOLDER ', this.tsFolder);
        return this;
    }


    evaluateFolder(dirPath: string): Process {
        const tsFiles: string[] = getTypescriptFiles(dirPath);
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
