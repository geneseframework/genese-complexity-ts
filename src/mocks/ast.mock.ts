import { EvaluationValuesInterface } from '../interfaces/evaluation-values.interface';

import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

let DICTIONARY;
let OperationType;
let Status;

export class AstMock {

    utils;
    geneseService;

    updateIncidentStatus(incidentId: string, newStatus): Observable<any> {
        const QUESTION: string = DICTIONARY.CONFIRMATION_DIALOG[`${newStatus === Status.CLOSED ? 'CLOSE' : 'REOPEN'}_INCIDENT`];
        return this.utils
            .openConfirmationDialog(QUESTION, true)
            .afterClosed()
            .pipe(
                switchMap((res: string | false) => {
                    return res !== false
                        ? this.geneseService.putIncidentByIncidentId(
                            {
                                operation_type: newStatus === Status.CLOSED ? OperationType.CLOSE : OperationType.REOPEN,
                                message: res,
                            },
                            incidentId
                        )
                        : of(null);
                })
            );
    }

}
