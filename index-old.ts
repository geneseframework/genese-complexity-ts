import { Process } from './src/process';
import { Options } from './src/models/options';

const appRoot = require('app-root-path').toString();

function initProcess() {
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/amadeus/amadeus-cmt/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/thermofisher/thermo-front/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/aura/victi-aura-affectations-frontend/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/retex/airbus-retex-front/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/naval-group/code/full/20200513-1730/cyms/naval-library/projects/ng-library/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/naval-group/code/full/20200513-1730/cyms/src/`;
    const pathFolderToAnalyse = `${appRoot}/src/`;
	const process = new Process();
	const options: Options = {
        pathFolderToAnalyse: pathFolderToAnalyse,
	    outDir: `${appRoot}/genese/complexity/reports`,
        cognitiveCpx: {
            errorThreshold: 10,
            warningThreshold: 5
        },
        cyclomaticCpx: {
            errorThreshold: 10,
            warningThreshold: 5
        },
    }
	process.start(options);
}

initProcess();
