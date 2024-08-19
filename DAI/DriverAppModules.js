const {DriverList, CarList} = require ("./Data.js")
const CreateDriver = require("./DriverObj.js")
const CreateCar = require("./CarObj.js")


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