let queueLinked = undefined;
let stackLinked = undefined;

class Node {
    constructor(value) {
        this.value = value;
        this.linked = 0;
    }

    print() {
        console.log(this.value);
    }

    getThis() {
        return this;
    }
}

function addToStack(element) {
    if (!stackLinked) {
        stackLinked = element;
        return;
    }
    //console.log("target linked =", target.linked)
    element.linked = stackLinked;
    stackLinked = element;
}



function getFromStack() {
    let result = stackLinked;
    stackLinked = stackLinked.linked;
    //Туть має видалятись непотрібний елемент
    return result.value;
}


iter = 0

while (iter < 10) {
    iter++
    let i = Math.floor(Math.random() * 100)
    addToStack(new Node(i));
    console.log(i);

}

stackLinked = reversed(stackLinked)
console.log("\n");

iter = 0
while (iter < 10) {
    iter++
    console.log(getFromStack());

}

// Recursion realization

/* function lastElement(element){
    if (!element.linked){
        return element;
    }
    return lastElement(element.linked);
}

function addToQueue(element) {
    if (!queueLinked){
        queueLinked = element;
        return ;
    }
    //console.log("target linked =", target.linked)
    lastElement(queueLinked).linked = element;
}
 */


function addToQueueUsingWhile(element) {
    var targetedNode
    if (!queueLinked) {
        queueLinked = element;
        return;
    }
    var targetedNode = queueLinked;
    while (targetedNode.linked) {
        targetedNode = targetedNode.linked;
    }
    targetedNode.linked = element;
}



function getFromQueue() {
    let result = queueLinked;
    queueLinked = queueLinked.linked;
    //Туть має видалятись непотрібний елемент
    return result.value;
}


function reversed(list) {
    const temp = [];
    let target = list
    while (target.linked) {
        temp.push(target);
        target = target.linked
    }
    temp.push(target);

    temp.forEach((element, index, arr) => {
        let link = index - 1
        element.linked = arr[link];
    })
    
    return temp[temp.length - 1]
}

console.log("\n");

iter = 0

while (iter < 10) {
    iter++
    let i = Math.floor(Math.random() * 100)
    addToQueueUsingWhile(new Node(i));
    console.log(i);

}

queueLinked = reversed(queueLinked)

console.log("\n");

iter = 0
while (iter < 10) {
    iter++
    console.log(getFromQueue());

} 