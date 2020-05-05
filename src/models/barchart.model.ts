import { Point } from './point.model';

export class Barchart {

    data?: Point[] = [];

    addResult(complexity: number, quantity = 1): Barchart {
        if (this.abscissaAlreadyExists(complexity)) {
            this.increaseOrdinate(complexity, quantity);
        } else {
            this.newBar(complexity, quantity = 1);
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

}

