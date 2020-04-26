"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var fs_extra_1 = require("fs-extra");
var Handlebars = require("handlebars");
var eol = require("eol");
var appRootPath = require('app-root-path');
/**
 * Holds all templates, and know how to apply them
 */
var Templates = /** @class */ (function () {
    // private globals: { [key: string]: any } = {};
    function Templates() {
        this.appRoot = appRootPath.toString(); // Root of the app
        this.parseReportTemplate();
    }
    Templates.prototype.parseReportTemplate = function () {
        var text = eol.auto(fs_extra_1["default"].readFileSync(this.appRoot + "/src/templates/report.handlebars", 'utf-8'));
        var compiled = Handlebars.compile(text);
        this.template = compiled;
        // Handlebars.registerPartial(baseName, compiled);
    };
    /**
     * Sets a global variable, that is, added to the model of all templates
     */
    // setGlobals(globals: Globals) {
    //     for (const name of Object.keys(globals)) {
    //         const value = (globals as { [key: string]: any })[name];
    //         this.globals[name] = value;
    //     }
    // }
    // private baseName(file: string): string | null {
    //     if (!file.endsWith('.handlebars')) {
    //         return null;
    //     }
    //     return file.substring(0, file.length - '.handlebars'.length);
    // }
    /**
     * Applies a template with a given model
     * @param templateName The template name (file without .handlebars extension)
     * @param model The model variables to be passed in to the template
     */
    Templates.prototype.apply = function (model) {
        var template = this.template;
        if (!template) {
            throw new Error("Template report not found.");
        }
        var actualModel = __assign({}, (model || {}));
        return template(actualModel);
    };
    return Templates;
}());
exports.Templates = Templates;
