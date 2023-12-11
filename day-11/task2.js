const exp = require("constants");
const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let image = data.toString().replace(/\r\n"/g, "\n").split("\n");
  let expandedImage = [];
  let emptyColumns = [];
  let emptyRows = [];
  let galaxies = [];
  const times = 1000000;

  image.forEach((line, index) => {
    if (line.split("").every((l) => l === ".")) {
      emptyRows.push(index);
    }
    expandedImage.push(line);
  });

  const findEmptyColumns = () => {
    for (let i = 0; i < expandedImage[0].length; i++) {
      let empty = true;
      expandedImage.forEach((column, j) => {
        if (column[i] !== ".") {
          empty = false;
          return;
        }
      });
      if (empty) {
        emptyColumns.push(i);
      }
    }
  };

  const findGalaxies = () => {
    expandedImage.forEach((row, i) => {
      row.forEach((char, j) => {
        if (char === "#") galaxies.push([i, j]);
      });
    });
  };

  const manhattanDist = (X1, Y1, X2, Y2) =>
    Math.abs(X2 - X1) + Math.abs(Y2 - Y1);

  findEmptyColumns();
  expandedImage = expandedImage.map((row) => row.split(""));
  findGalaxies();

  galaxies = galaxies.map((galaxy) => {
    let valueToAdd = 0;
    emptyColumns.forEach((column) => {
      if (galaxy && column < galaxy[1]) valueToAdd += times - 1;
    });
    return [galaxy[0], (galaxy[1] += valueToAdd)];
  });

  galaxies = galaxies.map((galaxy) => {
    let valueToAdd = 0;
    emptyRows.forEach((row) => {
      if (galaxy && row < galaxy[0]) valueToAdd += times - 1;
    });
    return [(galaxy[0] += valueToAdd), galaxy[1]];
  });

  let total = 0;

  while (galaxies.length > 0) {
    let galaxy = galaxies.pop();
    galaxies.forEach((g) => {
      total += manhattanDist(galaxy[1], galaxy[0], g[1], g[0]);
    });
  }

  console.log(total);

  const results = perf.stop();
  console.log(results);
});
