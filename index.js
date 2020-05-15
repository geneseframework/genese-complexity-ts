"use strict";
exports.__esModule = true;
var process_1 = require("./src/process");
var appRoot = require('app-root-path').toString();
function initProcess() {
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/amadeus/amadeus-cmt/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/aura/victi-aura-affectations-frontend/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/retex/airbus-retex-front/src/`;
    // const pathFolderToAnalyse = `/Users/utilisateur/Documents/projets/naval-group/code/full/20200513-1730/cyms/src/`;
    var pathFolderToAnalyse = appRoot + "/src/";
    var process = new process_1.Process();
    var options = {
        pathFolderToAnalyse: pathFolderToAnalyse,
        outDir: appRoot + "/genese/complexity/reports",
        cognitiveCpx: {
            errorThreshold: 9,
            warningThreshold: 4
        },
        cyclomaticCpx: {
            errorThreshold: 10,
            warningThreshold: 5
        }
    };
    process.start(options);
}
initProcess();
