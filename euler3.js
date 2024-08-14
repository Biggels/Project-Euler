// Largest Prime Factor

// function isPrime(n) {
//     for (let i = 2; i <= Math.sqrt(n); i++) { // only have to check up to sqrt of n, because if we haven't found one by then, it doesn't have any...factor greater than sqrt of n would need a counterpart lesser than sqrt of n
//         if (n % i === 0) {
//             return false;
//         }
//     }
//     return true;
// }

// okay, found a primality test (https://www.geeksforgeeks.org/introduction-to-primality-test-and-school-method/)
// It is based on the fact that all primes greater than 3 are of the form 6k ± 1, where k is any integer greater than 0. 
// This is because all integers can be expressed as (6k + i), where i = −1, 0, 1, 2, 3, or 4. 
// And note that 2 divides (6k + 0), (6k + 2), and (6k + 4) and 3 divides (6k + 3). 
// So, a more efficient method is to test whether n is divisible by 2 or 3, then to check through all numbers of the form 6k ± 1 <= √n. 
// This is 3 times faster than testing all numbers up to √n.

function isPrime(n) {
    if (n === 2 || n === 3)
        return true;

    if (n <= 1 || n % 2 === 0 || n % 3 === 0)
        return false;

    // To check through all numbers of the form 6k ± 1 
    for (let i = 5; i <= Math.sqrt(n); i += 6) {
        if (n % i === 0 || n % (i + 2) === 0)
            return false;
    }

    return true;
}

// could try a version that generates n primes, instead of primes up until n. just swap the for for a while, and only increment when you push
// but for this purpose we need to generate primes up to a number
// function generatePrimes(n) {
//     const primes = [];
//     for (let i = 2; i <= n; i++) {
//         if (isPrime(i)) {
//             primes.push(i);
//         }
//     }
//     return primes;
// }

// need a generator version
// so as a generator
// something like
// current 2, next 3
// keep iterating until isPrime, then yield that? yeah okay, that's not actually too hard

function* generatePrimes(n) {
    // 2 is the only even prime, so we can handle 2 as a special case, then start from 3 and count every other
    // and actually we can handle 2 and 3 as special cases, then only check the 6k+-1 numbers, b/c anything else is divisible by 2 or 3
    yield 2;
    yield 3;
    for (let i = 6; i <= n; i += 6) {
        if (isPrime(i - 1)) {
            yield i - 1;
        }
        if (isPrime(i + 1)) {
            yield i + 1;
        }
    }
}

// only need primes up to half the number in question, right? or i guess up to itself, because it could be prime
// so generate primes up to and including the number, then iterate over that array of primes, dividing by each number in turn until it doesn't divide evenly, etc.

function primeFactorsOf(n) {
    const factors = [];
    // could check if it's prime and early return. but i guess that's redundant
    // if (isPrime(n)) {
    //     factors.push(n);
    //     return factors;
    // }
    // then we only need to generate primes up to n/2
    // actually should use a generator function, because then i can just ask for the next one until we're done
    const primes = generatePrimes(n);
    for (let prime of primes) {
        while (n % prime === 0) {
            factors.push(prime);
            n = n / prime;
        }
        if (n === 1) {
            return factors;
        }
    }
}

// for really big numbers checking if each successive number is prime before trying to divide it into our number is a waste of time, right?
// we can just count up the odd numbers, and use that trick to exit early if our remaining number is greater than sqrt(n)?
// for really big numbers, it has to be faster to test divisibility for each one rather than test primality of each number, then test divisibility
// actually won't that always be true? it's never faster to test primality first, because it's a minimum of 1 extra check on every single number
// but obviously more and more and more checks for each successive number, so it slows down exponentially
// but we can use our primality test pattern to help still
// divide by 2 as many times as you can, divide by 3 as many times as you can, then do 6k +- 1 loop? does that still make sense?

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




console.log(primeFactorsOf(666555444333222));
// console.log(primeFactorsOf(358086));
// console.log(isPrime(3002502001501));
// console.log(primeFactorsOf(8962123));
// console.log(primeFactorsOf(600851475143));
// console.log(primeFactorsOf(333));

// console.log(...generatePrimes(1000));

// for (let prime of generatePrimes(7000)) {
//     console.log(prime);
// }

// console.log(primeFactorsOf(441));