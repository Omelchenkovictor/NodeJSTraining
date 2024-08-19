DriverList =  new Map(),
CarList = new Map()
var count1 = 0;





function addToIndexList(Type, Obj){
    switch(Type){
        case 'Driver':
            DriverList.set(Obj.FIO, Obj)
            break;
        case 'Car':
            count1++
            Obj.Id = count1
            CarList.set(Obj.Id, Obj)
            break;
    }

}

function CreateDriver(FIO, DOB, DOG, DOE, Cars){
    this.FIO = FIO;
    this.DateOfBirth = DOB;
    this.DateOfGet = DOG;
    this.DeteOfExpiration = DOE;
    this.Cars = Cars;

}


CreateDriver.prototype.AddToList = function() {
    addToIndexList('Driver', this);
};
CreateDriver.prototype.print = function() {
    console.log(this);
};
CreateDriver.prototype.SetFIO = function(FIO){
    DriverList.delete(this.FIO)
    this.FIO = FIO;
    DriverList.set(this.Index, this)
};
CreateDriver.prototype.SetDateOfBirth = function(DOB){
    this.DateOfBirth = DOB;
};
CreateDriver.prototype.SetDateOfGet = function(DOG){
    this.DateOfGet = DOG;
};
CreateDriver.prototype.SetDeteOfExpiration = function(DOE){
    this.DeteOfExpiration = DOE;
};
CreateDriver.prototype.SetCars = function(Cars){
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
CreateDriver.prototype.AddCar = function() {
    Driver.Cars.push(Cars)
}
CreateDriver.prototype.DeleteDriver = function() {
    this.Cars.forEach((element) => {
        element.DeleteCar()
    })
    DriverList.delete(this.FIO);
    console.log("Driver", this.FIO,"deleted");
}




function CreateCar(Mark, Id, DOR, IIS, Belongs){
    this.Mark = Mark;
    this.Id = Id;
    this.DateOfRepair = DOR;
    this.IsInSearch = IIS;
    this.BelongsTo = Belongs;

}



CreateCar.prototype.AddToList = function() {
    addToIndexList('Car', this);
    this.BelongsTo.Cars.push(this)
};

CreateCar.prototype.print = function() {
    console.log(this);
};

CreateCar.prototype.SetMark = function(Mark){
    this.Mark = Mark;
};
CreateCar.prototype.SetId = function(Id){
    CarList.delete(this.Id)
    this.Id = Id;
    CarList.set(this.Id, this)

};
CreateCar.prototype.SetDateOfRepair = function(DateOfRepair){
    this.DateOfRepair = DateOfRepair
};
CreateCar.prototype.SetIsInSearch = function(IIS){
    this.IsInSearch = IIS;
};
CreateCar.prototype.SetBelongsTo = function(Belongs){
    this.BelongsTo.Cars = this.BelongsTo.Cars.splice(this);
    this.BelongsTo = Belongs;
    this.BelongsTo.Cars.push(this)
};
CreateCar.prototype.DeleteCar = function(){
    CarList.delete(this.Id);
    console.log("Car", this.Mark, this.Id, " deleted");
};


// Створюємо тестові данні - Водій та 3 машини
const Me = new CreateDriver('OVA', 2001, 2021, 2051, []);
Me.AddToList();

const FellowCar = new CreateCar("AUDI", 7, 2090, true, Me);
FellowCar.AddToList();

const Car = new CreateCar("AUDI", 8, 2090, true, Me);
Car.AddToList();

const Car2 = new CreateCar("Doodle", 8, 2090, true, Me);
Car2.AddToList();

console.log(CarList)

const Cor = new CreateCar("AUDI", 9, 2090, true, Me);
Cor.AddToList();


// Перевіримо роботу сеттера імені, його взаємодії з мап
console.log("Перевіримо роботу сеттера імені, його взаємодії з мап")
Me.SetFIO("VA");

console.log(DriverList.get(Me.Index))


//видалимо водія 
console.log("Видалимо водія")
Me.DeleteDriver();
//FellowCar.DeleteCar();


console.log("Видалимо іншого водія")

const Who = new CreateDriver('WWW', 2011, 2031, 2051, []);
Who.AddToList();
Me.AddToList();

// Так як ми знову використовуємо об'єкт Me - він у нас залишиться зі зміненим фіо, виправимо

Me.SetFIO("OVA");

Who.DeleteDriver();

console.log("Car List", CarList);
///console.log( CarList[0]);
console.log("Driver list", DriverList);