// Largest Palindrome Product

function isPalindrome(n) {
    const number = n.toString();
    let i = 0;
    let j = number.length - 1;
    while (i <= j) { // 9112119
        if (number[i] !== number[j]) {
            return false;
        }
        i++;
        j--;
    }
    return true;
}

// instead of double pointer and a string, could make a function that mathemtically reverses the number. then compare reversed to original
function reverse(n) {
    let reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n = Math.floor(n / 10);
    }
    return reversed;
}

function isPalindrome(n) {
    return n === reverse(n);
}

console.log(isPalindrome(9112119))

const palindromes = [];
for (let i = 999; i > 99; i--) {
    for (let j = i; j > 99; j--) {
        if (isPalindrome(i * j)) {
            palindromes.push(i * j);
        }
    }
}

// could just save the largest palindrome, and break from the second loop early if our product is less than the largest palindrome found so far...shrug

// console.log(palindromes.sort((a, b) => b - a))
console.log(palindromes.reduce((acc, curr) => {
    if (curr > acc) {
        return curr;
    }
    return acc;
}));