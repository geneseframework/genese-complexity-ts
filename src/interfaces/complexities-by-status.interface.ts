import { Statuses } from '../models/statuses.model';
import { Addition } from './add.interface';

export class ComplexitiesByStatus implements Addition<ComplexitiesByStatus> {

    cognitive?: Statuses = new Statuses();
    cyclomatic?: Statuses = new Statuses();

    add(cpxByStatus: ComplexitiesByStatus): ComplexitiesByStatus {
        console.log('CPXBST  START', this);
        console.log('CPXBST START 2', cpxByStatus);
        const result: ComplexitiesByStatus = new ComplexitiesByStatus();
        result.cognitive = result.cognitive.add(cpxByStatus.cognitive);
        result.cyclomatic = result.cyclomatic.add(cpxByStatus.cyclomatic);
        console.log('CPXBST  END', result);
        return result;
    }

}
