export class Scores {

    private readonly _cognitiveScore = 0;
    private readonly _cyclomaticScore = 0;
    private readonly _fileName = '';
    private readonly _methodName = '';

    constructor() {
    }

    getcognitiveScore(): number {
        return this._cognitiveScore;
    }

    getcyclomaticScore(): number {
        return this._cyclomaticScore;
    }

    getfileName(): string {
        return this._fileName;
    }

    getmethodName(): string {
        return this._methodName;
    }
}
