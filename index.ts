import { Process } from './src/process';

const appRoot = require('app-root-path').toString();

function initProcess() {
    console.log(appRoot)
    // const src = `/Users/utilisateur/Documents/projets/naval-group/code/full/20200506-1451/cyms/src/`;
    const src = `${appRoot}/src/mocks/`;
    console.log('SRC = ', src)
	const process = new Process(src);
	const options = {
	    outDir: `${appRoot}/genese/complexity`,
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
