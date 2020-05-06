import { Barchart } from './barchart.model';
import { MethodsByStatus } from '../interfaces/methods-by-status.interface';

export class Stats {

    barChartCognitive?: Barchart = new Barchart();
    barChartCyclomatic?: Barchart = new Barchart();
    methodsByStatus?: MethodsByStatus = new MethodsByStatus();
    numberOfMethods ?= 0;
    percentUnderCognitiveThreshold ?= 0;
    percentUnderCyclomaticThreshold ?= 0;


    methodsUnderCognitiveErrorThreshold(): number {
        return this.methodsByStatus.cognitive.correct + this.methodsByStatus.cognitive.warning;
    }


    methodsUnderCyclomaticErrorThreshold(): number {
        return this.methodsByStatus.cyclomatic.correct + this.methodsByStatus.cyclomatic.warning;
    }
}
