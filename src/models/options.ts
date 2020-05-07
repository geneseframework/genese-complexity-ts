import { ComplexityType } from '../enums/complexity-type.enum';
import { Complexity } from '../interfaces/complexity.interface';
import { ChartColor } from '../enums/colors.enum';

const appRootPath = require('app-root-path');
const appRoot = appRootPath.toString();

export class Options {

    static cognitiveCpx: Complexity = {
        errorThreshold: 4,
        type: ComplexityType.COGNITIVE,
        warningThreshold: 3
    };
    static colors: ChartColor[] = [ChartColor.CORRECT, ChartColor.WARNING, ChartColor.ERROR];
    static cyclomaticCpx: Complexity = {
        errorThreshold: 5,
        type: ComplexityType.CYCLOMATIC,
        warningThreshold: 4
    };
    static outDir = `${appRoot}/genese/complexity`;


    static setOption(key: string, value: string): void {
        Options[key] = value;
    }


    static setOptions(options: object): void {
        for (const key of Object.keys(options)) {
            Options.setOption(key, options[key]);
        }
    }


    static getThresholds(cpxType: ComplexityType): number {
        switch (cpxType) {
            case ComplexityType.COGNITIVE:
                return Options.cognitiveCpx.warningThreshold
        }
    }
}
