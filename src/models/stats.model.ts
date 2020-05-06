import { Barchart } from './barchart.model';
import { MethodsByStatus } from '../interfaces/methods-by-status.interface';

export class Stats {

    barChartCognitive?: Barchart = new Barchart();
    barChartCyclomatic?: Barchart = new Barchart();
    methodsByStatus?: MethodsByStatus = new MethodsByStatus();
    numberOfMethods ?= 0;
    percentUnderCognitiveThreshold ?= 0;
    percentUnderCyclomaticThreshold ?= 0;


    cognitiveCorrect(): number {
        return this.methodsByStatus.cognitive.correct;
    }


    cognitiveCorrectOrWarning(): number {
        return this.methodsByStatus.cognitive.correct + this.methodsByStatus.cognitive.warning;
    }


    cognitiveWarning(): number {
        return this.methodsByStatus.cognitive.warning;
    }


    cognitiveError(): number {
        return this.methodsByStatus.cognitive.error;
    }


    cyclomaticCorrect(): number {
        return this.methodsByStatus.cyclomatic.correct;
    }


    cyclomaticCorrectOrWarning(): number {
        return this.methodsByStatus.cyclomatic.correct + this.methodsByStatus.cyclomatic.warning;
    }


    cyclomaticWarning(): number {
        return this.methodsByStatus.cyclomatic.warning;
    }


    cyclomaticError(): number {
        return this.methodsByStatus.cyclomatic.error;
    }
}
