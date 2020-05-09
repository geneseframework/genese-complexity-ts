import { Barchart } from './barchart.model';
import { ComplexityByStatus } from '../interfaces/methods-by-status.interface';
import { ComplexityType } from '../enums/complexity-type.enum';
import { Tools } from '../services/tools.service';
import { Bar } from './point.model';

export class Stats {

    barChartCognitive?: Barchart = new Barchart(ComplexityType.COGNITIVE);
    barChartCyclomatic?: Barchart = new Barchart(ComplexityType.CYCLOMATIC);
    numberOfMethodsByStatus?: ComplexityByStatus = new ComplexityByStatus();
    numberOfMethods ?= 0;
    percentsByStatus?: ComplexityByStatus = {};
    totalCognitiveComplexity ?= 0;
    totalCyclomaticComplexity ?= 0;


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


    plugChartHoles(): Stats {
        this.barChartCognitive = this.barChartCognitive.plugChartHoles();
        this.barChartCyclomatic = this.barChartCyclomatic.plugChartHoles();
        return this;
    }


    cumulateComplexities(): void {
        this.totalCognitiveComplexity = this.cumulateComplexitiesByChart(this.barChartCognitive.data);
        this.totalCyclomaticComplexity = this.cumulateComplexitiesByChart(this.barChartCyclomatic.data);
    }


    cumulateComplexitiesByChart(data: Bar[]): number {
        if (!data?.length) {
            return 0;
        }
        return data.map(e => e.x * e.y).reduce((total, current)  =>  total + current);
    }
}
