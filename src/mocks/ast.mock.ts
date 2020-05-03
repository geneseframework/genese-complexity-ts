export class AstMock {

    binaries(a, b, c, d): number {
        if (a && b && c || d || a && b && c && a) {
            return 3;
        }
    }
}
