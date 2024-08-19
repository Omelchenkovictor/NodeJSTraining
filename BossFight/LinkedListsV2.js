const { linkedList } = require('./linkedListData');

class Node {
    constructor(value) {
        this.value = value;
        this.Left = null;
        this.Right = null;
    }

    print() {
        console.log(this.value);
    }

    getThis() {
        return this;
    }
}

//console.log(linkedList)
//console.log(linkedList['first'])

function addThis(element, leftE, rightE) {
    leftE.Right = element;
    rightE.Left = element;
    element.Left = leftE;
    element.Right = rightE;
}


function deleteThis(element) {
    element.Left.Right = element.Right;
    element.Right.Left = element.Left;

}


function insertElement(element, position) {
    if (!linkedList[position]) {
        linkedList.first = element;
        linkedList.last = element;
        element.Left = element;
        element.Right = element;
        return;
    }
    addThis(element, linkedList.last, linkedList.first)
    linkedList[position] = element;
}


function getFirst() {
    let result = linkedList.first;
    deleteThis(linkedList.first);
    linkedList.first = result.Right;
    return result.value;
}

function getLast() {
    let result = linkedList.last;
    deleteThis(linkedList.last);
    linkedList.last = result.Left;
    return result.value;
}

function sort(amount) {
    let iter1 = 0;
    let iter2 = 0;
    target = linkedList.first;
    biggest = { value: -1 };
    while (iter1 < amount) {
        while (iter2 + iter1 < amount) {
            if (biggest.value < target.value) {
                biggest = target;
            }
            target = target.Right;
            iter2++;
        }
        if (biggest == linkedList.first) {
            linkedList.first = biggest.Right;
        }
        console.log(biggest)
        deleteThis(biggest);
        insertElement(biggest, 'last');
        iter1++;
        iter2 = 0;
        biggest = { value: -1 };
        target = linkedList.first;
    }
}




let iter = 0

while (iter < 10) {
    iter++
    let i = Math.floor(Math.random() * 100)
    insertElement(new Node(i), 'last');
    console.log(i);

}

sort(10)


console.log("\n");

iter = 0
while (iter < 10) {
    iter++
    console.log(getLast());

}

/* console.log(linkedList.first.value);
console.log(linkedList.last.value);
console.log(linkedList.last.Right.value);
console.log(linkedList.last.Left.value);
 */

