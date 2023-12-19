const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let trench = data.toString().replace(/\r\n"/g, "\n").split("\n");
  trench = trench.map((row) => row.replace(/[()]/g, ""));
  trench = trench.map((row) => row.split(" "));
  trench = trench.map((row) => [row[0], parseInt(row[1]), row[2]]);

  const dirs = {
    0: "R",
    1: "D",
    2: "L",
    3: "U",
  };

  let colorTrench = trench.map((row) => [
    dirs[row[2].slice(-1)],
    parseInt(row[2].slice(1, 6), 16),
  ]);
  let coords = [];
  let boundaryPoints = 0;

  const createCoords = (prev, t, i) => {
    if (coords.length === trench.length) return;
    let y = prev.y;
    let x = prev.x;
    if (t[0] === "R") x += t[1];
    if (t[0] === "L") x -= t[1];
    if (t[0] === "D") y += t[1];
    if (t[0] === "U") y -= t[1];
    boundaryPoints += t[1];
    coords.push({ y, x });
    i += 1;
    return createCoords({ y, x }, colorTrench[i], i);
  };

  createCoords({ y: 0, x: 0 }, colorTrench[0], 0);

  function polygonArea() {
    var area = 0;
    for (var i = 0; i < coords.length; i++) {
      j = (i + 1) % coords.length;
      area += coords[i].x * coords[j].y;
      area -= coords[j].x * coords[i].y;
    }
    return area / 2;
  }

  function picksTheorem(I, B) {
    const area = I + B / 2 + 1;
    return area;
  }

  const interiorPoints = polygonArea();

  console.log("Part 2:", picksTheorem(interiorPoints, boundaryPoints));
});
