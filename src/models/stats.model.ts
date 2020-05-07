import { Barchart } from './barchart.model';
import { MethodsByStatus } from '../interfaces/methods-by-status.interface';
import { ComplexityType } from '../enums/complexity-type.enum';
import { Tools } from '../services/tools.service';

export class Stats {

    barChartCognitive?: Barchart = new Barchart(ComplexityType.COGNITIVE);
    barChartCyclomatic?: Barchart = new Barchart(ComplexityType.CYCLOMATIC);
    numberOfMethodsByStatus?: MethodsByStatus = new MethodsByStatus();
    numberOfMethods ?= 0;
    percentsByStatus?: MethodsByStatus = {};


    addPercentages(): void {
        this.addPercentagesByComplexity(ComplexityType.COGNITIVE);
        this.addPercentagesByComplexity(ComplexityType.CYCLOMATIC);
    }


    addPercentagesByComplexity(cpx: ComplexityType): void {
        if (this.numberOfMethodsByStatus[cpx]) {
            this.percentsByStatus[cpx] = {};
            this.percentsByStatus[cpx].correct = Tools.percent(this.numberOfMethodsByStatus[cpx].correct, this.numberOfMethods);
            this.percentsByStatus[cpx].warning = Tools.percent(this.numberOfMethodsByStatus[cpx].warning, this.numberOfMethods);
            this.percentsByStatus[cpx].error = Tools.percent(this.numberOfMethodsByStatus[cpx].error, this.numberOfMethods);
        }
    }


    cognitiveCorrect(): number {
        return this.numberOfMethodsByStatus.cognitive.correct;
    }


    cognitiveCorrectOrWarning(): number {
        return this.numberOfMethodsByStatus.cognitive.correct + this.numberOfMethodsByStatus.cognitive.warning;
    }


    cognitiveWarning(): number {
        return this.numberOfMethodsByStatus.cognitive.warning;
    }


    cognitiveError(): number {
        return this.numberOfMethodsByStatus.cognitive.error;
    }


    cyclomaticCorrect(): number {
        return this.numberOfMethodsByStatus.cyclomatic.correct;
    }


    cyclomaticCorrectOrWarning(): number {
        return this.numberOfMethodsByStatus.cyclomatic.correct + this.numberOfMethodsByStatus.cyclomatic.warning;
    }


    cyclomaticWarning(): number {
        return this.numberOfMethodsByStatus.cyclomatic.warning;
    }


    cyclomaticError(): number {
        return this.numberOfMethodsByStatus.cyclomatic.error;
    }
}
