const appRootPath = require('app-root-path');
const appRoot = appRootPath.toString();

export class Options {

    static outDir = `${appRoot}/genese/complexity`;
    static threshold = 4;


    static setOption(key: string, value: string): void {
        Options[key] = value;
    }


    static setOptions(options: object): void {
        for (const key of Object.keys(options)) {
            Options.setOption(key, options[key]);
        }
    }
}
