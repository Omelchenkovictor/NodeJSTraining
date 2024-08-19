const someArr = [];
iter = 0;

while(iter < 10) {
    iter++;
    let i = Math.floor(Math.random() * 100);
    someArr.push(i);
    //console.log(i);
}


console.log(someArr);
const copyArr = [...someArr];
console.log(copyArr);
///console.log(someArr === copyArr);


someArr[0] = 999
copyArr[5] = 999

const Obj = {
    var1: copyArr,
    var2: someArr
}

const Obj3 = {...Obj}

const Obj2 = JSON.parse(JSON.stringify(Obj));

console.log(Obj.var1 === Obj2.var1);

console.log(Obj.var1 === Obj3.var1);