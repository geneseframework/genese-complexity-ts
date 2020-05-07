import { Process } from './src/process';

const appRootPath = require('app-root-path');
const appRoot = appRootPath.toString();

function initProcess() {
    const appRoot = appRootPath.toString();                   // Root of the app
    console.log(appRoot)
	const process = new Process(`${appRoot}/src/mocks/`);
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
