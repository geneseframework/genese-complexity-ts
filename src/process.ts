import * as ts from 'typescript';
import * as fs from 'fs-extra';
import { ReportService } from './services/report.service';
import { getFilename } from './services/file.service';
import { TsFolder } from './models/ts-folder';
import { TsTree } from './models/ts-tree.model';
import { TsFolderService } from './services/ts-folder.service';


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
        this.setTsFolder()
            .generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }


    setTsFolder(): Process {
        this.tsFolder = TsFolderService.generate(this.path, 'ts');
        // console.log('TS FOLDER ', this.tsFolder);
        return this;
    }


    // evaluateFile(pathFile: string): void {
    //     const fileName = getFilename(pathFile);
    //     const sourceFile = ts.createSourceFile(fileName,
    //         fs.readFileSync(pathFile, 'utf8'),
    //         ts.ScriptTarget.Latest);
    //     const walker = new FileWalkerService(sourceFile);
    //     walker.walk();
    // }


    generateReport(): void {
        const reportService: ReportService = new ReportService(this.tsFolder);
        reportService.generateReport();
    }
}
