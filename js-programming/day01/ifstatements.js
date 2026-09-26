let score = 50;
if (score >= 60) {
    console.log("You passed the test!");
} else {
    console.log("You failed the test.");
}   

let score2 = 75;
if (score2 >= 60) {
  console.log("You passed the test!");
} else {
  console.log("You failed the test.");
}   

console.log("+++++else if++++");
let number = -1;
if (number > 0) {
    console.log("The number is positive.");
} else if (number < 0) {
    console.log("The number is negative.");
} else {
    console.log("The number is zero.");
}   

console.log("+++++nested if-else++++");
let score3 = -85;
if (score3 >= 0 && score3 <= 100) {
    if (score3 >= 60) {
        console.log("You passed the test!");
    } else {
        console.log("You failed the test.");
    }
} else {
    console.log("Invalid score. Please enter a score between 0 and 100.");
}   