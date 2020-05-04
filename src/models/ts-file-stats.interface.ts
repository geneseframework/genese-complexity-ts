import { Barchart } from './barchart.model';

export class TsFileStats {

    barChartCognitive?: Barchart = new Barchart();
    barChartCyclomatic?: Barchart = new Barchart();
    methodsUnderCognitiveThreshold = 0;
    methodsUnderCyclomaticThreshold = 0;
    numberOfMethods = 0;
    percentUnderCognitiveThreshold = 0;
    percentUnderCyclomaticThreshold = 0;

}
