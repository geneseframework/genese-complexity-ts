export class Tools {

    static percent(numerator: number, denominator: number): number {
        const percentage = Math.round(numerator * 1000 / denominator) / 10;
        console.log('percentage', percentage)
        return percentage;
    }
}
