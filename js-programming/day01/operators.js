console.log(10+20);
console.log(10-6);
console.log(10*5);
console.log(10/2);
console.log(10%3);

let x ;
console.log(x);

x = 10;
console.log(x);

x+= 5;
console.log(x);

x-= 3;
console.log(x);

console.log(10 > 20);
console.log(10 <= 10);
console.log(10 < 20);
console.log(10 == 20);
console.log(10 != 20);
console.log(10 >= 20);
console.log(10 <= 20);


console.log(10 === "10"); // strict equality
console.log(10 == "10"); // loose equality -- ignores data type and only checks value

console.log(10 != "10"); // loose inequality - returns false because it ignores data type and only checks value
console.log(10 !== "10"); // strict inequality - returns true because it checks both value and data type

console.log("++++++++&&++++++++")
console.log( true && true);
console.log( true && false);
console.log( false && true);
console.log( false && false); // logical AND operator - returns true only if both operands are true
    
console.log("+++++++OR+++++++++")     
console.log( true || true);
console.log( true || false);
console.log( false || true);
console.log( false || false); // logical OR operator - returns true if at least one operand is true     

console.log("+++++++NOT+++++++++");     
console.log( !true);
console.log( !false);
