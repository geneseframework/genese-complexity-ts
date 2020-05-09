import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';

export class RowFolderReport {

    complexitiesByStatus: ComplexitiesByStatus;
    folderName ?= '';
    numberOfFiles ?= 0;
    numberOfMethods ?= 0;

}
