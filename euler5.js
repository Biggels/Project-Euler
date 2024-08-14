// Smallest Multiple

Number.prototype.isDivisibleBy1Through = function (n) {
    for (let i = 1; i <= n; i++) {
        if (this % i !== 0) {
            return false;
        }
    }
    return true;
}

let num = 232792560;
console.log(num.isDivisibleBy1Through(20));


let i = 20;
while (!(i.isDivisibleBy1Through(20))) {
    i += 20;
}
console.log(i)


// but brute force is ridiculous
// just get prime factors for each number, 1 through 20, and take enough of each prime to cover all the numbers
// easy to do on paper, interesting to program
function primeFactorsOf(n) {
    const factors = [];
    for (let i of [2, 3]) {
        while (n % i === 0) {
            factors.push(i);
            n = n / i;
        }
        if (n === 1) {
            return factors;
        }
    }

    for (let i = 6; (i - 1) <= Math.sqrt(n); i += 6) {
        let j = i - 1;
        let k = i + 1;
        while (n % j === 0) {
            factors.push(j);
            n = n / j;
        }
        if (n === 1) {
            return factors;
        }
        while (n % k === 0) {
            factors.push(k);
            n = n / k;
        }
        if (n === 1) {
            return factors;
        }
    }
    factors.push(n);
    return factors;
}


