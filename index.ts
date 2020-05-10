import { Process } from './src/process';

const appRoot = require('app-root-path').toString();

function initProcess() {
    // const analysisPath = `/Users/utilisateur/Documents/projets/amadeus/amadeus-cmt/src/`;
    // const analysisPath = `/Users/utilisateur/Documents/projets/aura/victi-aura-affectations-frontend/src/`;
    // const analysisPath = `/Users/utilisateur/Documents/projets/retex/airbus-retex-front/src/`;
    // const analysisPath = `/Users/utilisateur/Documents/projets/naval-group/code/full/20200506-1451/cyms/src/`;
    const analysisPath = `${appRoot}/src/mocks/`;
	const process = new Process();
	const options = {
        analysisPath: analysisPath,
	    outDir: `${appRoot}/genese/complexity/reports`,
        cognitive: {
            thresholdWarning: 3,
            thresholdError: 4
        },
        cyclomatic: {
            thresholdWarning: 4,
            thresholdError: 6
        },
    }
	process.start(options);
}

initProcess();
