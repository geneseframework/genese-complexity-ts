import { Process } from './src/process';

const appRoot = require('app-root-path').toString();

function initProcess() {
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
