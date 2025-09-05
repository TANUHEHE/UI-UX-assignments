// PART 1
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter first number: ", (a) => {
  rl.question("Enter second number: ", (b) => {
    a = Number(a);
    b = Number(b);

    console.log("Sum:", a + b);
    console.log("Difference:", a - b);
    console.log("Product:", a * b);
    console.log("Quotient:", b !== 0 ? a / b : "Cannot divide by zero");

    rl.close();
  });
});


