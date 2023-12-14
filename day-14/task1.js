const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let platform = data.toString().replace(/\r\n"/g, "\n").split("\n");

  const createColumns = (platform) => {
    let columns = [];
    for (let i = 0; i < platform[0].length; i++) {
      let column = "";
      platform.forEach((row) => {
        column = row[i] + column;
      });
      columns.push(column);
    }
    return columns;
  };

  const moveRocks = (column) => {
    let rocks = [];
    let inserts = {};
    let newColumn = [...column];
    if (!column.match(/O/g)) return column;
    column.split("").forEach((col, index) => {
      if (col === "O") {
        rocks.push(col);
        newColumn[index] = ".";
      }
      if (rocks.length > 0 && col === "#") {
        inserts[index] = rocks;
        rocks = [];
      }
    });

    Object.keys(inserts).forEach((key) => {
      const numRocks = inserts[key].length;
      newColumn.splice(key - numRocks, numRocks, ...inserts[key]);
    });

    if (rocks.length > 0)
      newColumn.splice(newColumn.length - rocks.length, rocks.length, ...rocks);

    return newColumn.join("");
  };

  let tiltedPlatform = createColumns(platform);
  tiltedPlatform = tiltedPlatform.map((platform) => moveRocks(platform));

  let total = 0;

  for (let i = tiltedPlatform[0].length - 1; i >= 0; i--) {
    tiltedPlatform.forEach((row) => {
      if (row[i] === "O") total += i + 1;
    });
  }

  console.log('Part 1:', total);

  const results = perf.stop();
  console.log(results);
});
