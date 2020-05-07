"use strict";
exports.__esModule = true;
var process_1 = require("./src/process");
var appRoot = require('app-root-path').toString();
function initProcess() {
    var process = new process_1.Process(appRoot + "/src/mocks/");
    var options = {
        outDir: appRoot + "/genese/complexity",
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
