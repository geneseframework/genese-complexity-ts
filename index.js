"use strict";
exports.__esModule = true;
var process_1 = require("./src/process");
var appRoot = require('app-root-path').toString();
function initProcess() {
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/amadeus/amadeus-cmt/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/aura/victi-aura-affectations-frontend/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/retex/airbus-retex-front/src/`;
    var analysisPath = "/Users/utilisateur/Documents/projets/naval-group/code/full/20200513-1730/cyms/src/";
    // const pathFolderToAnalyse = `${appRoot}/src/mocks/`;
    var process = new process_1.Process();
    var options = {
        pathFolderToAnalyse: analysisPath,
        outDir: appRoot + "/genese/complexity/reports",
        cognitive: {
            thresholdWarning: 3,
            thresholdError: 4
        },
        cyclomatic: {
            thresholdWarning: 4,
            thresholdError: 6
        }
    };
    process.start(options);
}
initProcess();
