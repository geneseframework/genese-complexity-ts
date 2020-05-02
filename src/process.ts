import * as ts from 'typescript';
import { ReportService } from './services/report.service';
import { TsFolder } from './models/ts-folder';
import { TsFolderService } from './services/ts-folder.service';


export class Process {

    private readonly path: string;
    private tsFolder?: TsFolder = new TsFolder();

    constructor(path: string) {
        this.path = path;
    }

    start(): void {
        console.log('START CALCULATION');
        this.setTsFolder()
            .generateReport();
        console.log('REPORT GENERATED SUCCESSFULLY');
    }


    setTsFolder(): Process {
        this.tsFolder = TsFolderService.generate(this.path, 'ts');
        return this;
    }


    generateReport(): void {
        const reportService: ReportService = new ReportService(this.tsFolder);
        reportService.generateReport();
    }
}
