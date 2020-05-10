import { Addition } from '../interfaces/add.interface';

export class Statuses implements Addition<Statuses>{

    correct ?= 0;
    warning ?= 0;
    error ?= 0;

    add(statuses: Statuses): Statuses {
        // console.log('STT START', this);
        // console.log('STT START 2', statuses);
        let newStatuses = new Statuses();
        newStatuses.correct = this.correct + statuses.correct;
        newStatuses.warning = this.warning + statuses.warning;
        newStatuses.error = this.error + statuses.error;
        // console.log('STT END', newStatuses);
        return newStatuses;
    }
}
