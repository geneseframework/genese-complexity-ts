import { ComplexityType } from '../enums/complexity.type';

export interface Complexity {

    errorThreshold: number;
    type: ComplexityType;
    warningThreshold: number;

}
