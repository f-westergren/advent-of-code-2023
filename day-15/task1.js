const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let steps = data.toString().replace(/\r\n"/g, "\n").split(",");
  let values = [];

  const getValue = (step) => {
    let value = 0;
    
    step.split('').forEach((char, i) => {
        value += step.charCodeAt(i);
        value *= 17;
        value = value%256;    
    });
    values.push(value);
    value = 0;   
  }

  steps.forEach(step => getValue(step));
  values = values.reduce((x, y) => x + y)

  console.log('Part 1:', values)
 

//   const results = perf.stop();
//   console.log(results);
});
