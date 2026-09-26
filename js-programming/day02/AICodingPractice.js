//create an array of strings and add 10 employee names to it.
let employeeNames = ["Alice Johnson", "Bob Smith", "Charlie Davis", "David Martinez", "Eva Thompson", "Frank Wilson", "Grace Anderson", "Hannah Lee", "Ian Brown", "Jack Miller"];

//set first employee name to "John Doe" and last employee name to "Jane Doe"
employeeNames[0] = "John Doe";
employeeNames[employeeNames.length - 1] = "Jane Doe";

//print the array of employee names to the console
console.log(employeeNames);

//print the length of the array to the console
console.log("Number of employees: " + employeeNames.length);

//use a for loop to print each employee name to the console
for (let i = 0; i < employeeNames.length; i++) {
    console.log(employeeNames[i]);
}

//display the elements of the employeeNames in reverse order
for (let i = employeeNames.length - 1; i >= 0; i--) {
    console.log(employeeNames[i]);
}

//create a new array of random numbers and populate it with 10 random numbers between 1 and 1000    
let randomNumbers = [100,200,300,400,5,4,7,6,10,33];

//write a program to display minimum and maximum number from the array of random numbers, do not use any built-in functions like Math.min() or Math.max()
let min = randomNumbers[0];
let max = randomNumbers[0];

for (let i = 1; i < randomNumbers.length; i++) {
    if (randomNumbers[i] < min) {
        min = randomNumbers[i];
    }
    if (randomNumbers[i] > max) {
        max = randomNumbers[i];
    }
}

console.log("Minimum number: " + min);
console.log("Maximum number: " + max);


//write a program to sort the array of random numbers in ascending order without using any built-in functions
for (let i = 0; i < randomNumbers.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < randomNumbers.length - i - 1; j++) {
        if (randomNumbers[j] > randomNumbers[j + 1]) {
            let temp = randomNumbers[j];
            randomNumbers[j] = randomNumbers[j + 1];
            randomNumbers[j + 1] = temp;
            swapped = true;
        }
    }
    if (!swapped) {
        break;
    }
}

console.log("Sorted array in ascending order: " + randomNumbers);


let numbers = [1,1,2,2,3,3,1,1,1,3,3,3,2,2,2,2,2,1,3,3,4,5,4,5,4,5,5,5,5,7,8,8,3,4,6,7]

//write a program to remove the duplicate numbers from the array and display the unique numbers in the console
let uniqueNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    if (!uniqueNumbers.includes(numbers[i])) {
        uniqueNumbers.push(numbers[i]);
    }
}

console.log("Unique numbers: " + uniqueNumbers);    

