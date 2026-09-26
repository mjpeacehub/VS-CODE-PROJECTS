let school = "Cydeo";
console.log(school);
console.log(typeof school);
console.log(school.length);

console.log(school.toUpperCase());
console.log(school.toLowerCase());

console.log(school.charAt(3));
console.log(school[2]);

console.log(school[school.length - 1]); // last character of the string


for (let i = 0; i < school.length; i++) {
    console.log(school[i]);
}   


console.log("--------String compare=======");
let expected = "Java";
let actual = "java";

console.log(expected === actual);

console.log(expected.toLowerCase() === actual.toLowerCase());

console.log("--------String=======");
console.log(school);
console.log(school.toUpperCase()); //not changing the original string , will go to garbage collection if not assigned to a variable
console.log(school);

school = school.toUpperCase(); // changing the original string by reassigning it to a new value
console.log(school);


console.log("--------String replace=======");

str1 = "I like Java";
str2 = str1.replace("Java", "JavaScript");
console.log(str1);
console.log(str2);

str3 = str1.replace("Java", "Python");
console.log(str3);


str4 = "I like Java and Java is fun";
str5 = str4.replace("Java", "Python");
console.log(str5); // only replaces the first occurrence of "Java"

str6 = str4.replaceAll("Java", "Python");
console.log(str6); // replaces all occurrences of "

str7 = str4.replace(/Java/g, "Python");
console.log(str7); // replaces all occurrences of "Java" using regular expression - /Java/g - g is for global search

console.log("--------Substring=======");
let email = "cydeo@gmail.com"
console.log(email.substring(0, 5)); // "cydeo"
console.log(email.substring(6)); // "gmail" substring(starting index)
console.log(email.substring(email.indexOf("@") + 1)); // "gmail.com" substring(starting index) - indexOf("@") + 1 to get the domain name after the @ symbol
console.log(email.substring(email.indexOf("@") + 1, email.lastIndexOf("."))); // "gmail" substring(starting index, ending index) - indexOf("@") + 1 to get the domain name after the @ symbol and indexOf(".") to get the domain name before the .com


console.log("--------Concatenation =======");

let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log(fullName);

let age = 30;
let city = "New York";
let country = "USA";
console.log(`My name is ${fullName} and my age is ${age}`);