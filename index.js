"use strict";
exports.__esModule = true;
var process_1 = require("./src/process");
var appRoot = require('app-root-path').toString();
function initProcess() {
    console.log(appRoot);
    // const src = `/Users/utilisateur/Documents/projets/amadeus/amadeus-cmt/src/`;
    // const src = `/Users/utilisateur/Documents/projets/aura/victi-aura-affectations-frontend/src/`;
    // const src = `/Users/utilisateur/Documents/projets/retex/airbus-retex-front/src/`;
    // const src = `/Users/utilisateur/Documents/projets/naval-group/code/full/20200506-1451/cyms/src/`;
    var src = appRoot + "/src/mocks/";
    var process = new process_1.Process(src);
    var options = {
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
