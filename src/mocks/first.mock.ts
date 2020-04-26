class MethodsMock {

	constructor() {
	}


	sumOfPrimes(max: number): number {
		let total = 0;
		for (let i = 1; i < max; ++i) {
			for (let j = 2; j < i; ++j) {
				if (i % j === 0) {
					console.log(`sumOfPrimes i = ${i} / j = ${j}`);
				}
			}
			total += i;
		}
		return total;
	}



	getWords(numberOfWords: number) {
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
