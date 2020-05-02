export class TsTreeService {


    private static instance: TsTreeService = undefined;
    private _lastId = 1;


    private constructor() {
    }


    static getInstance(): TsTreeService {
        if (!this.instance) {
            TsTreeService.instance = new TsTreeService();
        }
        return TsTreeService.instance;
    }


    getLastId(): number {
        return this._lastId;
    }


    createNewId(): number {
        this._lastId ++;
        return this._lastId;
    }
}
