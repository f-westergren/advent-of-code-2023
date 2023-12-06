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
    .replace(/\w*:.\s*/g, "")
    .replace(/\s\s+/g, ",")
    .replace(/\,/g, "")
    .split("\n");

  const checkDistance = (time, record) => {
    let i = 1;
    let tempNum = 0;

    while (i < time) {
      let distance;
      distance = i * (time - i);

      if (distance > record) tempNum += 1;
      i += 1;
    }

    return tempNum;
  };

  const num = checkDistance(parseInt(times[0]), parseInt(times[1]));

  console.log("Part 2:", num);
  const results = perf.stop();
  console.log(results);
});
