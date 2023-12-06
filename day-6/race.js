const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let times = data
    .toString()
    .replace(/\r\n"/g, "\n")
    .split("\n");

  console.log('times', times)

  const results = perf.stop();
  console.log(results);
});
