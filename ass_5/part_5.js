let numbers = [1, 2, 3, 4, 5, 6];

// Remove odd numbers
let evenNumbers = numbers.filter(n => n % 2 === 0);

// Multiply remaining by 2
let multiplied = evenNumbers.map(n => n * 2);

// Find sum
let sum = multiplied.reduce((acc, n) => acc + n, 0);

console.log("Original:", numbers);
console.log("Even Numbers:", evenNumbers);
console.log("Multiplied:", multiplied);
console.log("Sum:", sum);
