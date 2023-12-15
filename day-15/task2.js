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
    
    step.split('').forEach((_, i) => {
        value += step.charCodeAt(i);
        value *= 17;
        value = value%256;    
    });
    return value;  
  }

  const getValues = (step) => {
    const matches = step.match(/([A-Za-z]+)(-|=)([0-9]+)?/);
    return {box: getValue(matches[1]), label: matches[1], operator: matches[2], focalLength: parseInt(matches[3])}
  }

  values = steps.map(step => getValues(step))
  const boxes = {};

  const addToBox = (box, label, focalLength) => {
    let inBox = false;
    box.forEach(val => {
        if (val.label === label) {
            val.focalLength = focalLength
            inBox = true;
            return;
        }
    })
    if (!inBox) box.push({label, focalLength})
  }

  const removeFromBox = (box, label) => {
    return box.filter(val => val.label !== label);
  }

  let total = 0;
  const sumValues = (box, i) => {
    box.forEach((b, j) => {
        total += (i+1) * (j+1) * b.focalLength; 
    })
  }

  values.forEach(({box, label, operator, focalLength}) => {
    if (operator === '=') {
        if (!boxes[box]) boxes[box] = [{label, focalLength}];
        else addToBox(boxes[box], label, focalLength)        
    } else {
        if (boxes[box]) {
            boxes[box] = removeFromBox(boxes[box], label);
        }
    }
  })

  Object.keys(boxes).forEach((box) => sumValues(boxes[box], parseInt(box)))

  console.log('Part 2:', total)
 
//   const results = perf.stop();
//   console.log(results);
});
