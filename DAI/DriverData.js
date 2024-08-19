// Створення ВОДІЙ: ФІО, Дата Нар., Дата Отр., Дата Простр., Машини.
// Створення МАШИНА: Марка, Реєстр.Ном., Дата ТО, В розшуку.

const DriverList = [];
const CarList = [];
function CtrFn(name, age, isAlive){
    this.data = {name: 'solo', age: 145, isAlive: false};
    //this.data = obj
    this.print = function(){}
}

CtrFn.prototype.print = function() {
    console.log(this.data.name, '!!!!');
}
const test = new CtrFn();
console.log(test.data.name);
test.print();

const t = Object.create({
    print(){
        console.log('!!!', this.name);
    }
})

t.name = 'hello'
t.print();


const Dv = () => {
    const Driver = {
        FIO: "",
        DateOfBirth: 0,
        DateOfGet: 0,
        DeteOfExpiration: 0,
        Cars: []
    };
    
    return {
        SetFIO(FIO){
            Driver.FIO = FIO;
        },
        SetDateOfBirth(DOB){
            Driver.DateOfBirth = DOB;
        },
        SetDateOfGet(DOG){
            Driver.DateOfGet = DOG;
        },
        SetDeteOfExpiration(DOE){
            Driver.DeteOfExpiration = DOE;
        },
        SetCars(Cars){
            Driver.Cars =  [];
            if (Cars.length != 0) {Driver.Cars.push(Cars)};
        },
        AddCars(Cars){
            //Driver.Cars = [];
            Driver.Cars.push(Cars)
        },
        GetFIO(){
            return(Driver.FIO);
        },
        GetDateOfBirth(){
            return(Driver.DateOfBirth);
        },
        GetDateOfGet(){
            return(Driver.DateOfGet);
        },
        GetDeteOfExpiration(){
            return(Driver.DeteOfExpiration);
        },
        GetCars(){
            return(Driver.Cars);
        },
        print() {
            console.log(Driver)
        },
        CreateDriver(FIO, DOB, DOG, DOE, Cars) {
            this.SetFIO(FIO);
            this.SetDateOfBirth(DOB);
            this.SetDateOfGet(DOG);
            this.SetDeteOfExpiration(DOE);
            this.SetCars(Cars);
            DriverList.push(this);
        },
        DeleteDriver(){
            //console.log(Driver.Cars)
            for (let value of Driver.Cars) {
                //value.DeleteCar()
                let t = CarList.indexOf(value)
                //console.log(t)
                //console.log(value.GetId())
                if (t != -1) {
                CarList.splice(t, 1);
                console.log("Car deleted", value.GetId());
                };
            }
            let dd2 = DriverList.indexOf(Driver);
            DriverList.splice(dd2, 1);
            console.log("Driver deleted");
        }

    }
}

const Cr = () => {
    const Car = {
        Mark: "",
        Id: 0,
        DateOfRepair: 0,
        IsInSearch: false,
        BelongsTo: NaN
    };
    
    return {
        SetMark(Mark){
            Car.Mark = Mark;
        },
        SetId(Id){
            Car.Id = Id;
        },
        SetDateOfRepair(DateOfRepair){
            Car.DateOfRepair = DateOfRepair
        },
        SetIsInSearch(IIS){
            Car.IsInSearch = IIS;
        },
        SetBelongsTo(Belongs){
            Car.BelongsTo = Belongs;
        },
        GetMark(){
            return Car.Mark;
        },
        GetId(){
            return Car.Id;
        },
        GetIsInSearch(){
            return(Car.IsInSearch);
        },
        GetBelongsTo(){
            return(Car.BelongsTo);
        },
        print() {
            console.log(Car);
        },
        DeleteCar(){
            let d1 = Car.BelongsTo.GetCars().indexOf(Car.Id);
            if ( d1 != -1) {
                chng = Car.BelongsTo.GetCars().splice(d1, 1);
                Car.BelongsTo.SetCars(chng)
            };
            let d2 = CarList.indexOf(Car);
            CarList.splice(d2, 1);
            console.log("Car deleted");
        }
        
    }
}



const a = Cr();
CarList.push(a);

const Roadster = Cr();
CarList.push(Roadster);

const HMVY = Cr()
CarList.push(HMVY);


const A = Dv();
DriverList.push(A);

const Fred = Dv();
DriverList.push(Fred);

a.SetMark('AUDI');
a.SetId(1);
a.SetIsInSearch(false)
a.SetBelongsTo(A)

Roadster.SetMark('JEEP');
Roadster.SetId(2);
Roadster.SetIsInSearch(true);
Roadster.SetBelongsTo(A);

HMVY.SetMark('MRAP');
HMVY.SetId(3);
HMVY.SetIsInSearch(true);
HMVY.SetBelongsTo(Fred);

A.SetFIO('Bob');
A.SetDateOfBirth(1);
A.SetDateOfGet(2);
A.SetDeteOfExpiration(100);
A.SetCars(a);
A.AddCars(Roadster);

Fred.SetFIO('and George');
Fred.SetDateOfBirth(1990);
Fred.SetDateOfGet(2005);
Fred.SetDeteOfExpiration(2035);
Fred.SetCars([])
Fred.AddCars(HMVY)

a.print();
A.print();

console.log("Car List", CarList);
console.log("Driver list", DriverList);

//a.DeleteCar()
A.DeleteDriver()

console.log(HMVY.GetBelongsTo().GetFIO())
console.log(HMVY.GetBelongsTo().GetDeteOfExpiration())
console.log(HMVY.GetBelongsTo().GetCars())

console.log("Car List", CarList);
console.log("Driver list", DriverList);


// Реалізуємо функціонал для додавання водіїв - вже маємо сеттери, від них і підемо



const me = Dv()

me.CreateDriver('OVA', 2001, 2021, 2051, [])



console.log("Car List", CarList);
console.log("Driver list", DriverList);

me.print()
console.log(me.GetCars()[0])