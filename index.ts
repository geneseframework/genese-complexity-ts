import { Process } from './src/process';
import { Options } from './src/models/options';

const appRootPath = require('app-root-path');

function calculate() {
    const appRoot = appRootPath.toString();                   // Root of the app
	const process = new Process(`${appRoot}/src/mocks/`);
	const options = {
	    threshold: 4
    }
	process.start(options);
}

calculate();
