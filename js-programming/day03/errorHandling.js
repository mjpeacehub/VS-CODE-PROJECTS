console.log("Test started");
let result = "Test result";
try{
    console.log(result);
}
catch(e){
    console.log(`"Error occured": ${e}`)
}
finally{
    console.log ("Finally Bloc");
}

console.log("Test ended");

try{
    throw new Error("Test Ended with an error");
}
catch(e){
    console.log(`"Error occured": ${e}`);
}

