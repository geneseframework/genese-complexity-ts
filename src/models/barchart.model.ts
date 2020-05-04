import { Point } from './point.model';

export class Barchart {

    data?: Point[] = [];

    addResult(complexity: number) {
        if (this.abscissaAlreadyExists(complexity)) {
            this.increaseOrdinate(complexity);
        } else {
            this.createBar(complexity);
        }
    }


    abscissaAlreadyExists(complexity: number): boolean {
        return this.data.map(p => p.x).includes(complexity);
    }


    increaseOrdinate(abscissa: number): void {
        const index = this.data.findIndex(e => e.x === abscissa);
        this.data[index].y = this.data[index].y + 1;
    }


    createBar(complexity: number): void {
        this.data.push({x: complexity, y: 1});
    }
}

