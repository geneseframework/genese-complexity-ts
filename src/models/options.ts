import { ComplexityType } from '../enums/complexity-type.enum';
import { Complexity } from '../interfaces/complexity.interface';
import { ChartColor } from '../enums/colors.enum';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import { getPath } from '../services/file.service';


export class Options {

    static cognitiveCpx: Complexity = {
        errorThreshold: 10,
        type: ComplexityType.COGNITIVE,
        warningThreshold: 5
    };
    static colors: ChartColor[] = [ChartColor.CORRECT, ChartColor.WARNING, ChartColor.ERROR];
    static cyclomaticCpx: Complexity = {
        errorThreshold: 10,
        type: ComplexityType.CYCLOMATIC,
        warningThreshold: 5
    };
    static pathReports = '';
    static pathFolderToAnalyse = '';
    static pathRoot = '';


    static setOptions(): void {
            Options.pathRoot = getPath(process.argv[1]);
            Options.pathFolderToAnalyse = process.argv[2] ?? '.';
            Options.pathReports = `${Options.pathRoot}/genese/complexity/reports`;
    }


    static getThresholds(): ComplexitiesByStatus {
        const cpxByStatus = new ComplexitiesByStatus();
        cpxByStatus.cognitive.warning = Options.cognitiveCpx.warningThreshold;
        cpxByStatus.cognitive.error = Options.cognitiveCpx.errorThreshold;
        cpxByStatus.cyclomatic.warning = Options.cyclomaticCpx.warningThreshold;
        cpxByStatus.cyclomatic.error = Options.cyclomaticCpx.errorThreshold;
        return cpxByStatus;
    }
}
