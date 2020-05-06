import { Bar } from './point.model';
import { Options } from './options';
import { ComplexityType } from '../enums/complexity-type.enum';

export class Barchart {

    data?: Bar[] = [];
    cpxType?: ComplexityType;

    addResult(complexity: number, quantity = 1): Barchart {
        if (this.abscissaAlreadyExists(complexity)) {
            this.increaseOrdinate(complexity, quantity);
        } else {
            this.newBar(complexity, quantity);
        }
        return this;
    }


    abscissaAlreadyExists(complexity: number): boolean {
        return this.data.map(p => p.x).includes(complexity);
    }


    increaseOrdinate(abscissa: number, quantity = 1): void {
        const index = this.data.findIndex(e => e.x === abscissa);
        this.data[index].y = this.data[index].y + quantity;
    }


    newBar(complexity: number, quantity = 1): void {
        this.data.push({x: complexity, y: quantity});
    }


    sort(): Barchart {
        this.data = this.data.sort((A, B) => A.x - B.x);
        return this;
    }


    colorize(thresholdWarning: number, thresholdError: number): Barchart {
        this.data = this.data.map(bar => {
            return {
                color: this.getColor(bar),
                x: bar.x,
                y: bar.y
            }
        });
        return this;
    }


    getColor(bar: Bar): string {
        let color = Options.colorWarning;
        const cpx = `${this.cpxType}Cpx`;
        if (bar.x <= Options[cpx].warningThreshold) {
            color = Options.colorCorrect;
        } else if (bar.x > Options[cpx].errorThreshold) {
            color = Options.colorError;
        }
        return color;
    }

}

