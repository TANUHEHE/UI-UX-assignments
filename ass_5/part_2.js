// PART 2
let arr = [12, 45, 7, 23, 89];

let largest = Math.max(...arr);
let smallest = Math.min(...arr);

console.log("Largest:", largest);
console.log("Smallest:", smallest);

console.log("Ascending:", arr.slice().sort((x, y) => x - y));
console.log("Descending:", arr.slice().sort((x, y) => y - x));