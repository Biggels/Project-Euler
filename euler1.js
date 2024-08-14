// Multiples of 3 or 5
const limit = 1000;

function isMultiple(dividend, divisor) {
    return dividend % divisor == 0;
}

// sum as you go
let sum = 0;
for (let i = 0; i < limit; i++) {
    if (isMultiple(i, 3) || isMultiple(i, 5)) {
        sum += i;
    }
}
console.log(sum);

// get all multiples, then sum unique ones
function getMultiplesOf(divisor) {
    const multiples = [];
    for (let i = 0; i < limit; i++) {
        if (isMultiple(i, divisor)) {
            multiples.push(i);
        }
    }
    return new Set(multiples);
}

Set.prototype.union = function (b) {
    const union = new Set();
    for (const value of this) {
        union.add(value);
    }
    for (const value of b) {
        union.add(value);
    }
    return union;
}

const multiplesOf3And5 = getMultiplesOf(3).union(getMultiplesOf(5));
let setSum = 0;
multiplesOf3And5.forEach(value => setSum += value);

console.log(setSum);

// project euler approach, using math i would not have thought of lol

function sumDivisibleBy(n) {
    // 3 + 6 + 9 + 12 is the same as 3 * (1 + 2 + 3 + 4)
    const p = Math.floor((limit - 1) / n); // so here we're calculating the end of that sequence (p = 4 in above example)
    // now we have a trick for calculating the sum of that sequence
    // 1+2+3+...+p is the same as p*(p+1) // 2
    // e.g. 1+2+3+4 = 10; 4*5 = 20 // 2 = 10;
    // so we can use that trick to calculate our sum
    return n * Math.floor(p * (p + 1) / 2);
}

// so we can sum numbers divisible by 3, and sum numbers divisible by 5, and add those together
// but that will double count numbers divisible by both
// numbers divisible by both 3 and 5 (i.e. 3 and 5 are both factors for that number) will by definition be divisible by 15 (3*5)
// so we can just subtract the sum of numbers divisible by 15, and then we'll have our answer
const fancySum = sumDivisibleBy(3) + sumDivisibleBy(5) - sumDivisibleBy(3 * 5);
console.log(fancySum);