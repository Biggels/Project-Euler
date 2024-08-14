// Even Fibonacci Numbers

const limit = 4000000;

// counting up
const fibNumbers = [1, 2, 3, 5];

let i = fibNumbers.length - 1;
while (fibNumbers[i] + fibNumbers[i - 1] <= limit) {
    fibNumbers.push(fibNumbers[i] + fibNumbers[i - 1]);
    i += 1;
}

let sum = fibNumbers.reduce((acc, curr) => {
    if (curr % 2 === 0) {
        return acc + curr;
    } else {
        return acc;
    }
}, 0); // by default reduce starts with the first item as acc and the second item as curr. we don't want that, because that's starting with 1 in the sum already, which isn't even, so we'll tell it to start with 0 as acc, and then it will start with the first item (1) as curr.

// maybe a little cleaner with chaining filter and reduce. don't need to worry about specifying 0 as initial value, b/c now there are only evens to sum
sum = fibNumbers.filter(num => num % 2 === 0).reduce((acc, curr) => acc + curr);

console.log(fibNumbers);
console.log(sum);



// recursive function?
// given an index, it calls itself to ask for the previous 2 indices

// try having a global it can work with
const fibRef = [1, 2];
function fib(n) {
    if (fibRef[n]) {
        return fibRef[n]
    }
    const newTerm = fib(n - 1) + fib(n - 2);
    fibRef.push(newTerm);
    return newTerm;
}

let fibSum = 0;
for (let i = 0; fib(i) < limit; i++) {
    const term = fib(i);
    if (term < limit & term % 2 === 0) {
        fibSum += term;
    }
}

console.log(fibSum);

// the internet gives me a generator function, so that's cool, but a little over my head
function* fibonacci(n, current = 1, next = 2) {
    if (n === 0) {
        return current;
    }
    yield current;
    yield* fibonacci(n - 1, next, current + next);
}

console.log(...fibonacci(32));

// the overview also points out that every 3rd number in the sequence is even (although only if you start with 1 1 2, instead of 1 2 like they do in the question, but w/e)
// so you could modify it to not actually have to test for evens, but i'm not interested

// the even numbers also have their own rule you could use to generate just the evens
// E(n) = 4*E(n-1) + 4(n-2)

function* fibonevens(n, current = 2, next = 8) {
    if (n === 0) {
        return current;
    }
    yield current;
    yield* fibonevens(n - 1, next, current + 4 * next)
}

console.log(...fibonevens(10))

// i don't know how to keep iterating over the generator until the value is greater than a number...
// let evenSum = 0;
// for (let n of fibonevens(???)) {
//     if (n < limit) {
//         evenSum += n;
//     }
// }

console.log(evenSum)