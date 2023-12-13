const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let field = data.toString().replace(/\r\n"/g, "\n").split("\n");
  field = field.map((row) => row.split(" "));
  field = field.map((row) => [
    row[0],
    row[1].split(",").map((r) => parseInt(r)),
  ]);
  let rows = [];

  const checkRow = (row, rowIndex, checkedRow = "", i = 0) => {
    if (i === row.length) {
      rows.push([checkedRow, rowIndex]);
      return;
    } else {
      if (row[i] === "?") {
        checkRow(row, rowIndex, checkedRow + ".", i + 1);
        checkRow(row, rowIndex, checkedRow + "#", i + 1);
      } else {
        checkRow(row, rowIndex, checkedRow + row[i], i + 1);
      }
    }
  };

  const verifyRow = (row, i) => {
    let input = field[i][1];
    let allMatches = row.match(/#+/g);

    if (!allMatches) return false;
    if (allMatches.length !== input.length) return false;
    if (allMatches[0].length > input[0]) return false;
    for (j in allMatches) {
      if (allMatches[j].length !== input[j]) return false;
    }

    return true;
  };

  field.forEach((row, index) => checkRow(row[0], index));
  rows = rows.filter((row) => verifyRow(row[0], row[1]));

  console.log('Part 1:', rows.length);

  const results = perf.stop();
  console.log(results)
});
