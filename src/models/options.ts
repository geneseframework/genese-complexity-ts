import { ComplexityType } from '../enums/complexity.type';
import { Complexity } from '../interfaces/complexity.interface';

const appRootPath = require('app-root-path');
const appRoot = appRootPath.toString();

export class Options {

    static cognitiveCpx: Complexity = {
        errorThreshold: 4,
        type: ComplexityType.COGNITIVE,
        warningThreshold: 3
    };
    static cyclomaticCpx: Complexity = {
        errorThreshold: 5,
        type: ComplexityType.CYCLOMATIC,
        warningThreshold: 4
    };
    static colorCorrect = 'rgba(3, 169, 244, 0.6)';
    static colorWarning = 'rgba(255, 152, 0, 0.6)';
    static colorError = 'rgba(216, 27, 96, 0.6)';
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
