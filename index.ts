import { Process } from './src/process';

const appRootPath = require('app-root-path');
const appRoot = appRootPath.toString();

function calculate() {
    const appRoot = appRootPath.toString();                   // Root of the app
	const process = new Process(`${appRoot}/src/mocks/`);
	const options = {
	    outDir: `${appRoot}/genese/complexity`,
	    threshold: 4
    }
	process.start(options);
}

calculate();
