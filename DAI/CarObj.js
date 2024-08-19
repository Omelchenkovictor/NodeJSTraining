function CreateCar(Mark, Id, DOR, IIS, Belongs){
    this.Mark = Mark;
    this.Id = Id;
    this.DateOfRepair = DOR;
    this.IsInSearch = IIS;
    this.BelongsTo = Belongs;

}

var counter1 = 0;


CreateCar.prototype.AddToList = function() {
    counter1++
    this.Id = counter1
    CarList.set(this.Id, this)
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

module.exports = CreateCar;