import { Point } from './point.model';

export class TsFolderStats {

    methodsByCognitiveCpx?: Point[] = [];
    methodsByCyclomaticCpx?: Point[] = [];
    methodsUnderCognitiveThreshold = 0;
    methodsUnderCyclomaticThreshold = 0;
    numberOfFiles = 0;
    numberOfMethods = 0;
    percentUnderCognitiveThreshold = 0;
    percentUnderCyclomaticThreshold = 0;

}
