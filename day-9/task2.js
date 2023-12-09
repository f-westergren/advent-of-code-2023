const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let history = data.toString().replace(/\r\n"/g, "\n").split("\n");
  history = history.map((val) => val.split(" ").map((v) => parseInt(v)));
  let tempArrays = [];

  const addToArray = (val) => {
    let current = tempArrays[tempArrays.length-1];
    const firstNum = current[0];

    while (tempArrays.length > 1) {
      val = firstNum-val;
      tempArrays.pop();
      return addToArray(val);
    }
    tempArrays = []
    return firstNum-val;
  };

  const reduceArray = (arr) => {
    let newArray = [];
    arr.forEach((a, i) => {
      if (i !== 0) newArray.push(a - arr[i - 1]);
    });
    return newArray;
  };

  const checkValue = (arr) => {
    let current = [...arr];
    while (!current.every((v) => v === 0)) {
        tempArrays.push(current)
        current = reduceArray(current);
    } 
      return addToArray(current[0]);
  };


  let total = 0
  history.forEach((val) => total += checkValue(val));

  console.log('Part 2:', total);
});
