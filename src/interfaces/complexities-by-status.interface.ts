import { Statuses } from './statuses.interface';

export class ComplexitiesByStatus {

    cognitive?: Statuses = {
        correct: 0,
        error: 0,
        warning: 0,
    }
    cyclomatic?: Statuses = {
        correct: 0,
        error: 0,
        warning: 0,
    }

}
