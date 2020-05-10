import { ComplexityType } from '../enums/complexity-type.enum';
import { Complexity } from '../interfaces/complexity.interface';
import { ChartColor } from '../enums/colors.enum';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';

const appRootPath = require('app-root-path');
const appRoot = appRootPath.toString();

export class Options {

    static cognitiveCpx: Complexity = {
        errorThreshold: 8,
        type: ComplexityType.COGNITIVE,
        warningThreshold: 4
    };
    static colors: ChartColor[] = [ChartColor.CORRECT, ChartColor.WARNING, ChartColor.ERROR];
    static cyclomaticCpx: Complexity = {
        errorThreshold: 8,
        type: ComplexityType.CYCLOMATIC,
        warningThreshold: 4
    };
    static outDir = `${appRoot}/genese/complexity`;
    static pathRoot = appRoot;


    static setOption(key: string, value: string): void {
        Options[key] = value;
    }


    static setOptions(options: object): void {
        for (const key of Object.keys(options)) {
            Options.setOption(key, options[key]);
        }
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
