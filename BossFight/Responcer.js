var counter = 0;

//const Data = [];

//Data1 = [];

Data = new Map();

let Index = {

}

function ObjectCreator(name, type){
    this.Name = name;
    this.Type = type
    this.Id = undefined;

}


ObjectCreator.prototype.AddToList = function() {
    counter++
    this.Id = counter;
    Data.set(this.Id, this);
    this.Indexate();
};

ObjectCreator.prototype.Indexate = function() {
    Data.set(this.Id, this)
    try {
        Index[this.Type].push(this.Id);
        
    } catch (error) {
        //console.log(this.Type)
        console.log('Add', this.Type, "to indexation lists")
        Index[this.Type] = [];
        Index[this.Type].push(this.Id);
        
    }
};

ObjectCreator.prototype.print = function() {
    console.log(this);
};

ObjectCreator.prototype.DeleteFromList = function() {
    //console.log(Index[this.Type].filter((element)=>{return this.id != element}))
    Index[this.Type] = Index[this.Type].filter((element)=>{
        return this.Id != element})
    Data.delete(this.Id)
};


let testObject = new ObjectCreator('Lion', 'cat');
console.log(testObject);
testObject.AddToList();
console.log(testObject);
console.log(Data);
console.log(Index);
testObject.DeleteFromList();
console.log(Data);
console.log(Index);






/* const mySet1 = new Set();

mySet1.add(1); 
mySet1.add(5); 
mySet1.add(5); 
mySet1.add("some text"); 
const o = { a: 1, b: 2 };
mySet1.add(o);

mySet1.add({ a: 1, b: 2 }); 

//mySet1.has(1); 
//mySet1.has(3); 
//mySet1.has(5); 
mySet1.has(Math.sqrt(25)); 
mySet1.has("Some Text".toLowerCase());
mySet1.has(o); 

mySet1.size; 

mySet1.delete(5); 
mySet1.has(5); 

mySet1.size; 

mySet1.add(5); 

console.log(mySet1);  */