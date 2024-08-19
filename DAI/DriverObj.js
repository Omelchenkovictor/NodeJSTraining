function CreateDriver(FIO, DOB, DOG, DOE, Cars){
    this.FIO = FIO;
    this.DateOfBirth = DOB;
    this.DateOfGet = DOG;
    this.DeteOfExpiration = DOE;
    this.Cars = Cars;

}


CreateDriver.prototype.AddToList = function() {
    DriverList.set(this.FIO, this)
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

module.exports = CreateDriver;