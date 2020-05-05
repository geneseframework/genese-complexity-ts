import { Barchart } from '../models/barchart.model';

export class BarchartService {

    static concat(chart1: Barchart, chart2: Barchart): Barchart {
        if (!chart2) {
            return chart1;
        }
        console.log('CONCAT chart1', chart1)
        console.log('CONCAT chart2', chart2)
        for (const point of chart2.data) {
            chart1 = chart1.addResult(point.x, point.y);
        }
        console.log('CONCAT chart1 RESULT', chart1)
        return chart1;
    }

}
