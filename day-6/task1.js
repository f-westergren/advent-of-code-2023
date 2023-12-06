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
    .split("\n");

  times = times.map((time) => time.split(","));
  times = times[0].map((time, index) => [
    parseInt(time),
    parseInt(times[1][index]),
  ]);

  let num = [];

  const checkDistance = (time, record) => {
    let i = 1;
    let tempNum = 0;

    while (i < time) {
      let distance;
      distance = i * (time - i);

      if (distance > record) tempNum += 1;
      i += 1;
    }
    num.push(tempNum);
  };

  times.forEach((time) => checkDistance(time[0], time[1]));

  console.log(
    "Part 1:",
    num.reduce((a, b) => a * b, 1)
  );
  const results = perf.stop();
  console.log(results);
});
