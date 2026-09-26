
class Employee {
    constructor(name, salary, department){ // constructor to initialize the attributes, do not use default values for the attributes
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    work(){
        console.log(`${this.name} is working in ${this.department} department with a salary of ${this.salary}`);
    }
}

let emp1 = new Employee();
emp1.name = "John Doe";
emp1.salary = 50000;
emp1.department = "IT";
emp1.work();

let emp2 = new Employee("Jane Doe", 60000, "HR");
emp2.work();

let emp3 = new Employee(" ", 0, " ");
emp3.work();


/*create a class called student with the following requirements:
    Attributes: name, age, grade, subjects (array of subjects)
    Methods: study(), attendClass(), takeExam(), scoreExam()
    Create at least 3 instances of the student class and call the methods for each instance. 
    */

class Student {
    constructor(name, age, grade, subjects) {
        this.name = name;
        this.age = age;
        this.grade = grade;
        this.subjects = subjects;
    }

    study() {
        console.log(`${this.name} is studying ${this.subjects.join(", ")}.`);
    }

    attendClass() {
        console.log(`${this.name} is attending class for ${this.subjects.join(", ")}.`);
    }

    takeExam() {
        console.log(`${this.name} is taking an exam in ${this.subjects.join(", ")}.`);
    }

    scoreExam(score) {
        console.log(`${this.name} scored ${score} in the exam.`);
    }
}

let student1 = new Student("Alice", 20, "A", ["Math", "Science"]);
student1.study();
student1.attendClass();
student1.takeExam();
student1.scoreExam(95);

let student2 = new Student("Bob", 21, "B", ["History", "English"]);
student2.study();
student2.attendClass();
student2.takeExam();
student2.scoreExam(85);

let student3 = new Student("Charlie", 22, "C", ["Art", "Music"]);
student3.study();
student3.attendClass();
student3.takeExam();
student3.scoreExam(75);     

console.log(student1);
console.log(student2);
console.log(student3.takeExam());