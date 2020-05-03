export class Tools {

    static percent(numerator: number, denominator: number): string {
        const percentage = Math.round(numerator * 1000 / denominator) / 10;
        return percentage.toString();
    }
}
