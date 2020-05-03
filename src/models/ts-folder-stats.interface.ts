export interface TsFolderStats {
    methodsUnderCognitiveThreshold?: number;
    methodsUnderCyclomaticThreshold?: number;
    numberOfFiles?: number;
    numberOfMethods?: number;
    percentUnderCognitiveThreshold?: string;
    percentUnderCyclomaticThreshold?: string;
}
