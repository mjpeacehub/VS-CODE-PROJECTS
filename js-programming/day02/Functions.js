function greetings(){
    console.log("Hello, welcome to the program!");
    console.log("Have a great day!");
}


greetings();


function displayName(personName){
    console.log(`The name of the person is ${personName} `);
}
displayName("John Doe");
displayName();


console.log("---------SUM---------");
function sum(num1, num2){
    let result = num1 + num2;
    console.log(`The sum of ${num1} and ${num2} is ${result}`);
}
sum();
sum(5, 10);


function addNumbers(num1, num2, num3=0){
    return num1 + num2 + num3;
}

let result1 = addNumbers(50, 10);
console.log(`The sum of 50 and 10 is ${result1}`);