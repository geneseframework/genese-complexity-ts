class FirstMock {

    constructor() {
    }


    forforfor(max: number): number {
        let total = 0;
        for (let i = 1; i < max; ++i) {
            for (let j = 2; j < i; ++j) {
                for (let k = 2; k < 10; ++k) {
                    console.log(`k = ${k}`);
                }
            }
            total += i;
        }
        return total;
    }


    ififif(data: number): void {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                }
            }
        }
    }



    ifififelse(data: number): void {
        if (data > 2) {
            if (data > 3) {
                if (data > 4) {
                    console.log('data > 4');
                } else {
                    console.log('data <= 4');
                }
            }
        }
    }


    ifAnd(a, b) {
        if (a && b) {
            console.log(a);
        }
    }


    ifOr(a, b) {
        if (a || b) {
            console.log(a);
        }
    }


    ifAndAnd(a, b, c) {
        if (a && b && c) {
            console.log(a);
        }
    }


    ifAndOr(a, b, c) {
        if (a && b || c) {
            console.log(a);
        }
    }



    switches(numberOfWords: number) {
        switch (numberOfWords) {
            case 1:
                return "one";
            case 2:
                return "a couple";
            default:
                return "lots";
        }
    }
}
