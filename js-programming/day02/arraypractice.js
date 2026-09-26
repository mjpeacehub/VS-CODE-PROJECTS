let elements  = ["Java",10,true, 10.5, "Python", false];
console.log(elements);
console.log(typeof elements);
console.log(elements.length);

console.log(elements[0]);
console.log(elements[1]);
console.log(elements[elements.length - 1]); // last element of the array

for (let i = 0; i < elements.length; i++) {
    console.log(elements[i]);
}

for (let element of elements) {  
    console.log(element);
}


let employees = ["John", "Jane", "Jack", "Jill"];
console.log(employees);
console.log(employees.length);

employees[0] = "Mike"; // changing the first element of the array
console.log(employees);

employees.push("Mary"); // adding an element to the end of the array
console.log(employees);

employees.unshift("Tom"); // adding an element to the beginning of the array
console.log(employees);

employees.pop(); // removing the last element of the array
console.log(employees);

employees.shift(); // removing the first element of the array
console.log(employees);