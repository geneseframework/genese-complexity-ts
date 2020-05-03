const appRootPath = require('app-root-path');
const appRoot = appRootPath.toString();

export class Options {

    static cognitiveThreshold = 4;
    static cyclomaticThreshold = 3;
    static outDir = `${appRoot}/genese/complexity`;


    static setOption(key: string, value: string): void {
        Options[key] = value;
    }


    static setOptions(options: object): void {
        for (const key of Object.keys(options)) {
            Options.setOption(key, options[key]);
        }
    }
}
