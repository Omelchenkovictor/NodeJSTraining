/* const seconds = new Date().getTime() / 1000;

setTimeout(() => {
  // prints out "2", meaning that the callback is not called immediately after 500 milliseconds.
  console.log(`Ran after ${new Date().getTime() / 1000 - seconds} seconds`);
}, 500);

while (true) {
  if (new Date().getTime() / 1000 - seconds >= 6) {
    console.log("Good, looped for 6 seconds");
    break;
  }
} */
/*   function final(someInput, callback) {
    callback(`${someInput} and terminated by executing callback `);
  }
  function middleware(someInput, callback) {
    return final(`${someInput} touched by middleware `, callback);
  }
  function initiate() {
    const someInput = 'hello this is a function ';
    middleware(someInput, function (result) {
      console.log(result);
      // requires callback to `return` result
    });
  }
  initiate(); */

  // operations defined elsewhere and ready to execute
const operations = [
  { func: function1, args: args1 },
  { func: function2, args: args2 },
  { func: function3, args: args3 },
];
function executeFunctionWithArgs(operation, callback) {
  // executes function
  const { args, func } = operation;
  func(args, callback);
}
function serialProcedure(operation) {
  if (!operation) process.exit(0); // finished
  executeFunctionWithArgs(operation, function (result) {
    // continue AFTER callback
    serialProcedure(operations.shift());
  });
}
serialProcedure(operations.shift());