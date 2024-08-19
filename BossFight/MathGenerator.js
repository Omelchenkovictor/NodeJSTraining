
function* generate() {
  
    while (true) {
      yield Math.floor(Math.random() * 100);
    }
  }

const random = generate();

//console.log(random.next().value)

module.exports = {random};



  