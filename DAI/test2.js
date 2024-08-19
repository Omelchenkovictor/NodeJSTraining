const SomeSet = new Set([1, 2, 3])
const SomeMap = new Map([
    [1, "one"],
    [2, "two"],
    [4, "four"],
  ]);
//console.log(SomeSet.union(SomeMap)); // Set(4) {1, 2, 3, 4}

const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

console.log(map1.get('a'));

map1.set('a', 97);

console.log(map1.get('a'));


console.log(map1.size);


map1.delete('b');

console.log(map1.size);

console.log(SomeSet.has(2))

const expr = 'Onion';
switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Mangoes':
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    // Expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
    console.log(`Sorry, we are out of ${expr}.`);
}