export class AstMock {


    reducer(acc: Object, curr: any, index: number, path: number) {
        return Object(acc[curr]) === acc[curr] ? acc[curr] : (acc[curr] = isNaN(+path[index + 1]) ? {} : []);
    }
}
