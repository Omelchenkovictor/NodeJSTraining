const Obj1 = {
    id: 1,
    name: 'some',
    isAlive: false,
    team: 'Necrons'
}
const Obj2 = {
    id: 2,
    name: 'someone',
    isAlive: true,
    team: 'HUMANs'
}
const Obj3 = {
    id: 3,
    name: 'Mork',
    isAlive: true,
    team: 'Orks'
}
const Obj4 = {
    id: 4,
    name: 'Tzarekh',
    isAlive: false,
    team: 'Necrons'
}
const Obj5 = {
    id: 5,
    name: 'Gork',
    isAlive: true,
    team: 'Orks'
}

const Obj6 = {
    id: 6,
    name: 'Lanister',
    isAlive: true,
    team: 'HUMANs'
}

const Obj7 = {
    id: 7,
    name: 'Strory',
    isAlive: true,
    team: 'Squats'
}

const Obj8 = {
    id: 8,
    name: 'Zombie',
    isAlive: false,
    team: 'Undead'
}


const List = [ Obj1, Obj2, Obj3, Obj4, Obj5];

const IsAliveIndex = {
    Alive: [],
    Dead: []
}

const RaceCatalog = {
    Orks: [2, 4],
    HUMANs: [1],
    Necrons: [0,3]
}


/* function StartDeadOrAliveIterator(){
    IsAliveIndex.Alive = []
    IsAliveIndex.Dead = []
    for (value in List){
        if (List[value].isAlive){
            IsAliveIndex.Alive.push(value)
        } else {
            IsAliveIndex.Dead.push(value)
        }
    }
} */

function StartDeadOrAliveIterator(){
    IsAliveIndex.Alive = [];
    IsAliveIndex.Dead = [];
    List.forEach((item, index) =>{
        if (item.isAlive){
            IsAliveIndex.Alive.push(index);
        } else {
            IsAliveIndex.Dead.push(index);
        }
    })
};

/* function StartDeadOrAliveIteratorV2(){

} */


StartDeadOrAliveIterator()


function DeadOrAliveAdd(item){
    if (item.isAlive){
        IsAliveIndex.Alive.push(List.length - 1)
    } else {
        IsAliveIndex.Dead.push(List.length - 1)
    }
};

function RaceCatalogAdd(Player){
    if (!RaceCatalog[Player.team]){
        RaceCatalog[Player.team] = [];
    }
    RaceCatalog[Player.team].push(List.length - 1);
};


function AddToData(New){

    List.push(New);
    DeadOrAliveAdd(New);
    RaceCatalogAdd(New);

}

function ChangeState(Guinea){
    var ElementIndex = List.indexOf(Guinea)

    const IsDeletable = (SearcIndex)=> {
        return ElementIndex != SearcIndex;
    }

    if (ElementIndex){
        if (Guinea.isAlive){
            IsAliveIndex.Alive = IsAliveIndex.Alive.filter(IsDeletable)
            IsAliveIndex.Dead.push(ElementIndex)
        } else {
            IsAliveIndex.Dead = IsAliveIndex.Dead.filter(IsDeletable)
            IsAliveIndex.Alive.push(ElementIndex)
        }
    } else {
        AddToData(Guinea)
    }
    Guinea.isAlive = !Guinea.isAlive;
}





// Зробити додавання і редагування



/* function Reader(InputData){
    //console.log(Array.isArray(InputData))
    if(Array.isArray(InputData)){
        for (value in InputData) {
            //console.log(value)
            for (value1 in RaceCatalog[InputData[value]]){
                console.log(List[RaceCatalog[InputData[value]][value1]])

            }
        }
    } else{
        for (value in RaceCatalog[InputData]){
            console.log(List[RaceCatalog[InputData][value]]);
        }
    }
} */

function ReaderArray2(InputData){

    const Test = InputData ?? {}
    const output = [];
    
    if (Test.teamReader) {
        Input = Test.teamReader
        if(Array.isArray(Input)){
            Input.forEach((value) =>{
                RaceCatalog[value].forEach((value1) =>{
                    output.push(List[value1]);
                })
            })
        } else{
            RaceCatalog[Input].forEach((value, index) =>{
                output.push(List[value]);
            
            })
        }

    }


    if (Test.isAliveReader){
        Input = Test.isAliveReader
        if(Array.isArray(Input)){
            Input.forEach((value) =>{
                IsAliveIndex[value].forEach((value1) =>{
                    output.push(List[value1]);
                })
            })
        } else{
            IsAliveIndex[Input].forEach((value, index) =>{
                output.push(List[value]);
            
            })
        }

    }       
    return output
}





function ReaderArray(InputData){
    const output = [];
    if (!IsAliveIndex[InputData]){
            if(Array.isArray(InputData)){
            InputData.forEach((value, index, arr) =>{
                
                RaceCatalog[InputData[index]].forEach((value1, index1, arr1) =>{
                    output.push(List[RaceCatalog[InputData[index]][index1]]);

                })
            })
        } else{
            RaceCatalog[InputData].forEach((value, index, arr) =>{
                output.push(List[RaceCatalog[InputData][index]]);
            })
        }
        return output
    }

    else {
            if(Array.isArray(InputData)){
            InputData.forEach((value, index, arr) =>{
                IsAliveIndex[InputData[index]].forEach((value, index, arr) =>{
                    output.push(List[IsAliveIndex[InputData[index]][index1]]);

                })
            })
        } else{
            IsAliveIndex[InputData].forEach((value, index, arr) =>{
                output.push(List[IsAliveIndex[InputData][index]]);
            })
        }
        return output
    }


}


/* function ReaderArray(InputData){
    const output = [];
    //console.log(Array.isArray(InputData))
    if (!IsAliveIndex[InputData]){
            if(Array.isArray(InputData)){
            for (value in InputData) {
                //console.log(value)
                for (value1 in RaceCatalog[InputData[value]]){
                    output.push(List[RaceCatalog[InputData[value]][value1]]);

                }
            }
        } else{
            for (value in RaceCatalog[InputData]){
                output.push(List[RaceCatalog[InputData][value]]);
            }
        }
        return output}

    else {
            if(Array.isArray(InputData)){
            for (value in InputData) {
                //console.log(value)
                for (value1 in IsAliveIndex[InputData[value]]){
                    output.push(List[IsAliveIndex[InputData[value]][value1]]);

                }
            }
        } else{
            //console.log("туть")
            for (value in IsAliveIndex[InputData]){
                output.push(List[IsAliveIndex[InputData][value]]);
                //console.log(output)
            }
        }
        return output
    }


} */



AddToData(Obj6);
AddToData(Obj7);
AddToData(Obj8);


ChangeState(Obj8)
ChangeState(Obj7)

//console.log(List)
//console.log(RaceCatalog)
//Reader("Squats")
//Reader(["Necrons", 'HUMANs'])
//console.log(ReaderArray(["Necrons", 'HUMANs']))


/* console.log(IsAliveIndex.Alive) */
//console.log(IsAliveIndex.Dead)


console.log(ReaderArray("Necrons"))
//console.log(ReaderArray("Alive"))
//console.log(ReaderArray("Dead"))
//console.log('1' === 1)
//console.log(Date ())

let InputToReader = {
    //teamReader: 
    isAliveReader: "Dead"

}

console.log(ReaderArray2(InputToReader))