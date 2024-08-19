//const { random } = require('./MathGenerator');
Data = [];


class Node {
    constructor(value) {
        this.value = value;
        this.left = undefined;
        this.right = undefined;
        this.id = undefined;
    }
    print() {
        console.log(this.value);
    }

}

function* generate(amount) {
    let iter = 1
    while (amount >= iter) {
        iter++
      yield new Node(Math.floor(Math.random() * 100));
    }
  }


function findNode3(value, workOnElement) {
    if (value < workOnElement.value) {
        if (workOnElement.left) {
            console.log("less than", workOnElement.value);
            return findNode(value, workOnElement.left);
        } else {
            console.log("less than", workOnElement.value);
            return workOnElement;
        }

    }
    if (value > workOnElement.value) {
        if (workOnElement.right) {
            return findNode(value, workOnElement.right);
        } else {
            console.log("bigger than", workOnElement.value);
            return workOnElement;
        }
    }
    if (value == workOnElement.value) {
        console.log("Found!", workOnElement.value)
        return workOnElement;
    }

}

function findNode2(value, workOnElement) {
    while (true) {
        if (value < workOnElement.value) {
            if (!workOnElement.left) {
                break;
            }
            workOnElement = workOnElement.left;
        }
        else {
            if (!workOnElement.right) {
                break;
            }
            workOnElement = workOnElement.right;
        }
    }
    return workOnElement;
}


function findNode(value, workOnElement) {
    if (!workOnElement) {
        return null;
    }

    if (value == workOnElement.value) {
        console.log("Found!", workOnElement.value)
        return workOnElement.id;
    }

    if (value < workOnElement.value) {
        return findNode(value, workOnElement.left);
    }

    if (value > workOnElement.value) {
        return findNode(value, workOnElement.right);
    }
}

function addToData(element) {
    let parent = findNode2(element.value, Data[0])
    element.id = Data.length;
    if (parent.value > element.value) {
        console.log(element.id,',', 'Element', element.value, 'added');
        parent.left = element;
        Data.push(element);
        //console.log('child:', element, "parent:", parent)
    }
    if (parent.value < element.value) {
        //console.log('child:', element, "parent:", parent)
        console.log(element.id,',', 'Element', element.value, 'added');
        parent.right = element;
        Data.push(element);
    }
    if (parent.value === element.value) {
        console.log('Error! Element already exist')
    }
    //console.log(element)
    //console.log(parent)

}

const ElementZero = new Node(50);
ElementZero.id = 0;
Data.push(ElementZero);
let random = generate(80);
//console.log(Data);

//console.log(random.next().value)


for (element of random) {
    //console.log(element);
    addToData(element);
}

/* const Element3 = new Node(35);
addToData(Element3);

const Element4 = new Node(65);
addToData(Element4);

const Element5 = new Node(25);
addToData(Element5); */





console.log(findNode(25, Data[0]))
//console.log(Data[1])

// console.log(ElementZero);
// console.log(ElementZero.left);
// console.log(Element3);