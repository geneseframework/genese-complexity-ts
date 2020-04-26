var FirstMock = /** @class */ (function () {
    function FirstMock() {
    }
    FirstMock.prototype.sumOfPrimes = function (max) {
        var total = 0;
        for (var i = 1; i < max; ++i) {
            for (var j = 2; j < i; ++j) {
                if (i % j === 0) {
                    console.log("sumOfPrimes i = " + i + " / j = " + j);
                }
            }
            total += i;
        }
        return total;
    };
    FirstMock.prototype.getWords = function (numberOfWords) {
        switch (numberOfWords) {
            case 1:
                return "one";
            case 2:
                return "a couple";
            default:
                return "lots";
        }
    };
    return FirstMock;
}());
