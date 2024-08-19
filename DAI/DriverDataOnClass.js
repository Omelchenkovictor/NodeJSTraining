DriverList =  new Map(),
CarList = new Map()


function addToIndexList(Type, Obj){
    switch(Type){
        case 'Driver':
            DriverList.set(Obj.FIO, Obj)
            break;
        case 'Car':
            CarList.set(Obj.Id, Obj)
            break;
    }

}

class Driver {
    constructor(FIO, DOB, DOG, DOE, Cars){
        this.FIO = FIO;
        this.DateOfBirth = DOB;
        this.DateOfGet = DOG;
        this.DeteOfExpiration = DOE;
        this.Cars = Cars;
    }

    AddToList() {
        addToIndexList('Driver', this);
    };
    print() {
        console.log(this);
    };
    SetFIO(FIO){
        DriverList.delete(this.FIO)
        this.FIO = FIO;
        DriverList.set(this.FIO, this)
    };
    SetDateOfBirth(DOB){
        this.DateOfBirth = DOB;
    };
    SetDateOfGet(DOG){
        this.DateOfGet = DOG;
    };
    SetDeteOfExpiration(DOE){
        this.DeteOfExpiration = DOE;
    };
    SetCars(Cars){
        this.Cars.array.forEach(element => {
            element.DeleteCar()
        });;
        if (Array.isArray(Cars)){
            Cars.array.forEach(element => {
                this.Cars.push(element);
            });
        } else {
            this.Cars.push(Cars);
        }
    
        //if (Cars.length != 0) {
        //    this.Cars.push = function(Cars);
        //}
    };
    AddCar() {
        Driver.Cars.push(Cars)
    }
    DeleteDriver() {
        this.Cars.forEach((element) => {
            element.DeleteCar()
        })
        DriverList.delete(this.FIO);
        console.log("Driver", this.FIO,"deleted");
    }

}

class Car {
    constructor(Mark, Id, DOR, IIS, Belongs){
        this.Mark = Mark;
        this.Id = Id;
        this.DateOfRepair = DOR;
        this.IsInSearch = IIS;
        this.BelongsTo = Belongs;
    
    }
    AddToList() {
        addToIndexList('Car', this);
        this.BelongsTo.Cars.push(this)
    };
    
    print() {
        console.log(this);
    };
    
    SetMark(Mark) {
        this.Mark = Mark;
    };
    SetId(Id) {
        CarList.delete(this.Id)
        this.Id = Id;
        CarList.set(this.Id, this)
    
    };
    SetDateOfRepair(DateOfRepair) {
        this.DateOfRepair = DateOfRepair
    };
    SetIsInSearch(IIS) {
        this.IsInSearch = IIS;
    };
    SetBelongsTo(Belongs) {
        this.BelongsTo.Cars = this.BelongsTo.Cars.splice(this);
        this.BelongsTo = Belongs;
        this.BelongsTo.Cars.push(this)
    };
    DeleteCar() {
        CarList.delete(this.Id);
        console.log("Car", this.Mark, this.Id, " deleted");
    };
    
}

// Створюємо тестові данні - Водій та 3 машини
const Me = new Driver('OVA', 2001, 2021, 2051, []);
Me.AddToList();

const FellowCar = new Car("AUDI", 7, 2090, true, Me);
FellowCar.AddToList();

const Somecar = new Car("AUDI", 8, 2090, true, Me);
Somecar.AddToList();

const Cor = new Car("AUDI", 9, 2090, true, Me);
Cor.AddToList();


// Перевіримо роботу сеттера імені, його взаємодії з мап
console.log("Перевіримо роботу сеттера імені, його взаємодії з мап")
Me.SetFIO("VA");

console.log(DriverList.get('VA'))


//видалимо водія 
console.log("Видалимо водія")
Me.DeleteDriver();
//FellowCar.DeleteCar();


console.log("Видалимо іншого водія")

const Who = new Driver('WWW', 2011, 2031, 2051, []);
Who.AddToList();
Me.AddToList();

// Так як ми знову використовуємо об'єкт Me - він у нас залишиться зі зміненим фіо, виправимо

Me.SetFIO("OVA");

Who.DeleteDriver();

console.log("Car List", CarList);
///console.log( CarList[0]);
console.log("Driver list", DriverList);