let studentname;
console.log(studentname);

let student = "James";
let studentage = 21;
let isfulltime = true;
console.log(student);
console.log(typeof student);
console.log(studentage);
console.log(typeof studentage);
console.log(isfulltime);
console.log(typeof isfulltime);


student = "Bella";
console.log(student);
isfulltime = false;
console.log(isfulltime);

if (isfulltime === false)  {
    console.log("Student is not full time");
}

/*let keyword is used to declare a variable that can be reassigned later.
//let keyword is block scoped, meaning it is only accessible within the block it is defined in -- local scope - 
 variable name has to be unique within the block scope.  */

 const PI = 3.14;
 console.log(PI);
 //PI = 3.14159; // this will throw an error because PI is a constant and cannot be reassigned
 
 const MAXLIMIT = 100;
 console.log(MAXLIMIT);
