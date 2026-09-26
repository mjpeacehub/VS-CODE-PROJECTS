for (let i = 1; i <= 5; i++) {
  console.log("Iteration " + i);
}

console.log("+++++loop+++++");

for (let i = 0; i <= 5; i++) {
  console.log("Iteration " + i);
}

for (let i = 5; i >= 0; i--) {
  console.log("Iteration " + i); //
}

console.log("+++++break+++++");
for (let i = 1; i <= 10; i++) {
  console.log("Iteration " + i);
  if (i === 5) {
    //breaking the loop when a certain condition is met
    break;
  }
}

console.log("+++++continue+++++");
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    continue; //skipping the current iteration when a certain condition is met
  }
  console.log("Iteration " + i);
}

for (let i = 1; i <= 10; i++) {
  if (i == 5 || i == 7  ) {
    continue; //skipping the current iteration when a certain condition is met
  }
  console.log("Iteration " + i);
}