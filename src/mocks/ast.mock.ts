let DICTIONARY;

export class AstMock {
    formIsValid;
    createOrEdit;
    dialogRef;
    incidentService;
    incident;
    error;

    submit(): void {
        if (this.formIsValid) {
            this.createOrEdit().subscribe(
                () => {
                    this.dialogRef.close();
                    this.incidentService.incident.next(this.incident.incident_id);
                },
                (err: any) => {
                    this.error = err?.error?.description || DICTIONARY.DEFAULT_ERROR;
                }
            );
        }
    }
}
