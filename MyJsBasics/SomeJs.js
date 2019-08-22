//Recursive
function foo(i) {
    if (i < 0)
      return;
    console.log('begin: ' + i);
    foo(i - 1);
    console.log('end: ' + i);
  }
  foo(3);
class EmployeeClass {
  constructor(name1, age, salary, dept) {
    this.name1 = name1;
    this.age = age;
    this.salary = salary;
    this.dept = dept;
    this.printValue = () => { console.log("Name is " + this.name1); };
  }
}
class Manager extends EmployeeClass {
  constructor(name, age, salary, dept) {
    super(name, age, salary, dept);
    this.dept = "Senior";
     }
  someMethod() {

   this.name1 ="nothing";
  }
}
  
  var obj1 = new Manager("Vij",36,30000000);
  obj1.printValue();
  obj1.someMethod();
  obj1.printValue();
  obj1._proto_;