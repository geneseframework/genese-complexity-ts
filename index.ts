import { Process } from './src/process';

const appRootPath = require('app-root-path');

function calculate() {
    const appRoot = appRootPath.toString();                   // Root of the app
	const process = new Process(`${appRoot}/src/mocks/`);
	process.start();
}

calculate();
