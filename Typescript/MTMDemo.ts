export class MTM2022 {


    doSomething() {

        let a: number;

        a = 22;

        var b;

        b = b + 5;

        let myName = "Tesfaye";
        let demo1: any;
        demo1 = 4;

        // boolean data type 
        let raining: boolean = false;

        //undefined data type 
        let nullData = null;
        let uData = undefined;

        //array - a collection anything 

        let students: Student[];
        students = [
            new Student("Tesfaye", "email@email.com", "", "1/1/2000"),
            new Student("Lula", "lula@email.com", "", "1/1/2000"),
            new Student("Temesgen", "email@email.com", "", "1/1/2000"),
            new Student("Tadios", "email@email.com", "", "1/1/2000"),
        ];
        students[2];//Temesgen

    }


    doSomething2() {
        let c = 0;

        let student: Student = new Student("Tesfaye", "444-225-35654", "tesfaye@email.com", "4/1/2000");


        let studentName = student;
        //student.
    }

}


export class Student {
    name: string;
    phone: string;
    email: string;
    age?: number;
    dateOfBirth?: Date;

    constructor(name: string, phone: string, email: string, dob: string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = new Date(dob);
    }

    getName = () => this.name;
    //getName() {return  this.name; }

}

export interface ICourse {
    name;
    courseNumber;
    proferssor;
    getCourseDetail(): string;
}
export class Course {
    name;
    courseNumber;
    protected proferssor;
    private secreteCode;

    constructor(cName, cNumber){
        this.name = cName;
        this.courseNumber= cNumber;
    }

    getCourseDetail() {
        let a = this.proferssor;
        let code = this.secreteCode;
        return JSON.stringify(this);
    }
}

export class Language extends Course{
    department;   
    constructor(name){
        super(name, "0000");
    } 
    getDetails() {
        //let code = this.secreteCode;
        return this.proferssor;
    }
}

let course1 = new Course("English", "LAN001");
let eng = new Language("English");




//b = new Course();
function funcName() {
    let a: ICourse;

    a = { name: "Accounting", courseNumber: "", proferssor: "", getCourseDetail: () => "" };
    let b: Course = new Course("English", "LAN001");
    b.getCourseDetail();
    return 0;
}

export let funcName2 = () => {
    let a: ICourse;

    a = { name: "Accounting", courseNumber: "", proferssor: "", getCourseDetail: () => "" };
    let b: Course = new Course("English", "LAN001");
    b.getCourseDetail();

    let num = 5 + (new Date()).getFullYear();
    return 0;
}

funcName();

