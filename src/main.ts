export class Main {

    private source = __dirname;

    constructor() {}

    process(): void {
        console.log(`SOURCE ${this.source}`);

    }


    processFolder(): Main {
        return this;
    }


    processFiles(): Main {
        return this;
    }


    processFile(): void {
    }


    processMethods(): Main {
        return this;
    }


    processMethod(): void {

    }

}
