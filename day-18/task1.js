const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let trench = data.toString().replace(/\r\n"/g, "\n").split("\n");
  trench = trench.map((row) => row.split(" ("));

  let dp;

  dp = new Array(500).fill(0).map(() => new Array(500).fill(0));
  let coords = [250, 250];

  const digTrench = (dir, len) => {
    let [y, x] = coords;
    let i = 0;
    while (i <= len) {
      if (dir === "R") {
        dp[y][x + i] = "#";
      } else if (dir === "L") {
        dp[y][x - i] = "#";
      } else if (dir === "D") {
        dp[y + i][x] = "#";
      } else if (dir === "U") {
        dp[y - i][x] = "#";
      }
      i += 1;
    }

    if (dir === "R") coords[1] += parseInt(len);
    if (dir === "L") coords[1] -= parseInt(len);
    if (dir === "D") coords[0] += parseInt(len);
    if (dir === "U") coords[0] -= parseInt(len);
  };

  trench.forEach((t) => {
    t = t[0].split(" ");
    digTrench(t[0], t[1]);
  });
  dp = dp.filter((row) => row.join("").match(/#/g));
  
  let i = dp.length - 1;
  while (i > 0) {
    for (let j = 0; j < dp[0].length; j++) {
      if (dp[i][j] === "#" && dp[i - 1][j] === "#") dp[i][j] = "!";
    }
    i -= 1;
  }

  let total = 0;
  dp.forEach((row) => {
    row = row.join("");
    const outside = row.match(/#|\!/g);
    if (outside) total += outside.length;
    let inside = false;
    let i = 0;
    while (i < row.length) {
      if (row[i] === "!") inside = !inside;
      if (inside && row[i] === "0") total += 1;
      i += 1;
    }

  });

  console.log("Part 1:", total);
  //   console.log(dp)
});

// too low 11317
// too low 23097
