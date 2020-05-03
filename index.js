"use strict";
exports.__esModule = true;
var process_1 = require("./src/process");
var appRootPath = require('app-root-path');
function calculate() {
    var appRoot = appRootPath.toString(); // Root of the app
    var process = new process_1.Process(appRoot + "/src/mocks/");
    var options = {
        threshold: 4
    };
    process.start(options);
}
calculate();
