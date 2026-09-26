class person{  //parent class can contain attributes and methods that can be inherited by child classes - common to both student and teacher
    //attributes: name,age
    //methods: eat()
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    eat(){
        console.log(`${this.name} is eating`);
    }
}

class student  extends person {
    //child class can inherit attributes and methods from parent class
    // attributes: name,age,grade
    //methods: study(),eat()
    constructor(name, age, grade){
    super(name, age); //call the constructor of the parent class
    this.grade = grade;
    }
    study(){
        console.log(`${this.name}  is studying `);
    }
}        

class teacher extends person{  //child class can inherit attributes and methods from parent class
    //attributes: name,age,salary
    //methods: teach(),eat()
    constructor(name, age, salary){
        super(name, age); //call the constructor of the parent class
        this.salary = salary;
    }

    teach(){
        console.log(`${this.name} is teaching with a salary of ${this.salary}`);
    }
}

let student1 = new student("Harry",12,"Middle");
console.log(student1);
student1.eat();
student1.study();

let teacher1 = new teacher("Jane",25 , 200000);
console.log(teacher1);
teacher1.eat();
teacher1.teach();


console.log(student1.grade); 
