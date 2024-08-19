queue = new Array(10).fill(Math.floor(Math.random() * 100));
stack = new Array(10).fill(Math.floor(Math.random() * 100));


function getFromQueue() {
    // а тут можно замінити на .shift() ,або на крайній splice()
    // Реалізація так би мовити на С
    let result = queue[0];
    const queueCopy = [];
    queue.forEach((element, index) => {
        if(index != 0){
            queueCopy.push(element);
        }    
    });
    queue = queueCopy;
    return result;
}


function getFromQueueUsingWhile() {
    let result = queue[0];
    const queueCopy = [];
    queue.forEach((element, index) => {
        if(index != 0){
            queueCopy.push(element);
        }    
    });
    queue = queueCopy;
    return result;
}

function getFromStuck() {
    // а тут можно замінити на .pop() ,або на крайній splice()
    // Реалізація так би мовити на С
    let result = stack[stack.length - 1];
    const stackCopy =[];
    //stack.length = stack.length - 1
    stack.forEach((element, index) => {
        if(index != stack.length - 1){
            stackCopy.push(element);
        }  
    });
    stack = stackCopy;
    return result
}




function addToQueue(amount) {
    let iter = 0
    while (amount > iter) {
        queue[iter] = (Math.floor(Math.random() * 100));
        iter++;
    }
}

function addToStack(amount) {
    let iter = 0
    while (amount > iter) {
        stack[iter] = (Math.floor(Math.random() * 100));
        iter++;
    }
}


addToQueue(queue.length);
console.log(queue);
while(queue.length > 0) {
    console.log(getFromQueue());
} 

addToStack(stack.length);
console.log(stack);
while(stack.length > 0) {
    console.log(getFromStuck());
} 


/* function* getElements(amount){
    let target = 0
    let iter = 1
    while (amount >= iter) {
        iter++
      yield queue;
    }

} */