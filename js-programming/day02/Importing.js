//const utility = require ('./Utility'); - imports all fuctions from Utility.js file

/*
let result1 = utility.square(5);
let result2 = utility.cube(3);
let result3 = utility.calculateArea(10, 5);
console.log(`The square of 5 is ${result1}`);
console.log(`The cube of 3 is ${result2}`);
console.log(`The area of a rectangle with length 10 and width 5 is ${result3}`);    
*/

let a = 10;
let b = 20;
c =  a+b;
console.log(c);

const { calculateArea } = require("./Utility"); // - imports only the calculateArea function from Utility.js file in the current directory. The curly braces {} are used to destructure the object returned by the require function and extract only the calculateArea function.

let result = calculateArea(10, 5); // calculates the area
console.log(`The area of a rectangle with length 10 and width 5 is ${result}`);

const { add, subtract, divide, multiply } = require("../day01/Utility2"); // - import from Utility2.js in the day01 directory . the ../ is used to go up one level in the directory structure and access the day01 directory.

let result1 = add(10, 5);
console.log(`The sum of 10 and 5 is ${result1}`);

let result2 = subtract(10, 5);
console.log(`The difference of 10 and 5 is ${result2}`);

let result3 = multiply(10, 5);
console.log(`The product of 10 and 5 is ${result3}`);

let result4 = divide(10, 5);
console.log(`The quotient of 10 and 5 is ${result4}`);
