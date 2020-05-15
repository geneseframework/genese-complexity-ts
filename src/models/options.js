"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var colors_enum_1 = require("../enums/colors.enum");
var complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
var file_service_1 = require("../services/file.service");
var Options = /** @class */ (function () {
    function Options() {
    }
    Options.setOptions = function () {
        var _a;
        Options.pathRoot = file_service_1.getPath(process.argv[1]);
        Options.pathFolderToAnalyse = (_a = process.argv[2]) !== null && _a !== void 0 ? _a : '.';
        Options.pathReports = Options.pathRoot + "/genese/complexity/reports";
    };
    Options.getThresholds = function () {
        var cpxByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus();
        cpxByStatus.cognitive.warning = Options.cognitiveCpx.warningThreshold;
        cpxByStatus.cognitive.error = Options.cognitiveCpx.errorThreshold;
        cpxByStatus.cyclomatic.warning = Options.cyclomaticCpx.warningThreshold;
        cpxByStatus.cyclomatic.error = Options.cyclomaticCpx.errorThreshold;
        return cpxByStatus;
    };
    Options.cognitiveCpx = {
        errorThreshold: 8,
        type: complexity_type_enum_1.ComplexityType.COGNITIVE,
        warningThreshold: 4
    };
    Options.colors = [colors_enum_1.ChartColor.CORRECT, colors_enum_1.ChartColor.WARNING, colors_enum_1.ChartColor.ERROR];
    Options.cyclomaticCpx = {
        errorThreshold: 8,
        type: complexity_type_enum_1.ComplexityType.CYCLOMATIC,
        warningThreshold: 4
    };
    Options.pathReports = '';
    Options.pathFolderToAnalyse = '';
    Options.pathRoot = '';
    return Options;
}());
exports.Options = Options;
