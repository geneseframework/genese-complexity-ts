import fs from 'fs-extra';
import * as Handlebars from 'handlebars';
import * as eol from 'eol';
import * as path from 'path';
const appRootPath = require('app-root-path');

/**
 * Holds all templates, and know how to apply them
 */
export class Templates {

    private appRoot = appRootPath.toString();                   // Root of the app
    private template: HandlebarsTemplateDelegate;
    // private globals: { [key: string]: any } = {};

    constructor() {
        this.parseReportTemplate();
    }

    private parseReportTemplate() {
        const text = eol.auto(fs.readFileSync(`${this.appRoot}/src/templates/report.handlebars`, 'utf-8'));
        const compiled = Handlebars.compile(text);
        this.template = compiled;
        // Handlebars.registerPartial(baseName, compiled);
    }

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
    apply(model?: { [key: string]: any }): string {
        const template = this.template;
        if (!template) {
            throw new Error(`Template report not found.`);
        }
        const actualModel: { [key: string]: any } = {...(model || {}) };
        return template(actualModel);
    }

}
