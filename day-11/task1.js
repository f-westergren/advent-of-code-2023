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
  let columns = [];
  let galaxies = [];

  image.forEach((line) => {
    if (line.split("").every((l) => l === ".")) {
      expandedImage.push(line);
      expandedImage.push(line);
    } else {
      expandedImage.push(line);
    }
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
        columns.push(i);
      }
    }
  };

  const addColumns = () => {
    while (columns.length > 0) {
      let column = columns.pop();
      expandedImage = expandedImage.map(
        (row) => row.slice(0, column) + "." + row.slice(column)
      );
    }
  };

  const findGalaxies = () => {
    expandedImage.forEach((row, i) => {
      row.forEach((char, j) => {
        if (char === "#") galaxies.push([i, j]);
      });
    });
  };


  const manhattanDist = (X1, Y1, X2, Y2) => Math.abs(X2 - X1) + Math.abs(Y2 - Y1);

  findEmptyColumns();
  addColumns();
  expandedImage = expandedImage.map((row) => row.split(""));
  findGalaxies();

  let total = 0;

  while (galaxies.length > 0) {
    let galaxy = galaxies.pop();
    galaxies.forEach(g => {
        total += manhattanDist(galaxy[1], galaxy[0], g[1], g[0])
    });
  }

  console.log(total)

  const results = perf.stop();
  console.log(results);
});
