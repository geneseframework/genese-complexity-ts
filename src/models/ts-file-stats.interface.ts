import { Point } from './point.model';

export interface TsFileStats {

    methodsUnderCognitiveThreshold?: number;
    methodsUnderCyclomaticThreshold?: number;
    numberOfMethods?: number;
    methodsByCognitiveCpx?: Point[];
    methodsByCyclomaticCpx?: Point[];

}
