let DICTIONARY;

export class AstMock {
    formIsValid;
    createOrEdit;
    dialogRef;
    incidentService;
    incident;
    error;
    userService;
    keycloakAngular;

    isAccessAllowed(route, state): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const requiredRights: string[] = route.data.rights;
            if (!requiredRights || requiredRights.length === 0) {
                return resolve(true);
            } else {
                if (!this.userService.getRights() || this.userService.getRights().length === 0) {
                    this.keycloakAngular.logout();
                    resolve(false);
                }
                const result = requiredRights.find(right => this.userService.getRights().indexOf(right) > -1);
                if (result) {
                    resolve(true);
                } else {
                    this.keycloakAngular.logout();
                    resolve(false);
                }

            }
        });
    }

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
