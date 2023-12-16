const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let cave = data.toString().replace(/\r\n"/g, "\n").split("\n");
  cave = cave.map((c) => c.split(""));
  let caveCopy = JSON.parse(JSON.stringify(cave));

  const beams = [{ y: 0, x: 0, dir: "e" }];
  let count = 0;
  const memo = {};
  
  const moveBeam = (beam) => {
    const { dir, y, x } = beam;
    const memoKey = `${dir}-${y}-${x}`;
    if (memo[memoKey]) return;
    memo[memoKey] = true;
    if (!cave[y] || !cave[y][x]) return;
    const currentLocation = cave[y][x];
    if (caveCopy[y][x] !== "X") {
      caveCopy[y][x] = "X";
      count += 1;
    }
    if (currentLocation === ".") {
      if (dir === "n") beam.y -= 1;
      if (dir === "s") beam.y += 1;
      if (dir === "e") beam.x += 1;
      if (dir === "w") beam.x -= 1;
    } else if (currentLocation === "|") {
      if (dir === "n") beam.y -= 1;
      if (dir === "s") beam.y += 1;
      if (dir === "e") {
        beams.push({ y: y + 1, x, dir: "s" });
        beam = { y: y - 1, x, dir: "n" };
      }
      if (dir === "w") {
        beams.push({ y: y + 1, x, dir: "s" });
        beam = { y: y - 1, x, dir: "n" };
      }
    } else if (currentLocation === "-") {
      if (dir === "n") {
        beams.push({ y, x: x + 1, dir: "e" });
        beam = { y, x: x - 1, dir: "w" };
      }
      if (dir === "s") {
        beams.push({ y, x: x + 1, dir: "e" });
        beam = { y, x: x - 1, dir: "w" };
      }
      if (dir === "e") beam.x += 1;
      if (dir === "w") beam.x -= 1;
    } else if (currentLocation === "/") {
      if (dir === "n") beam = { y, x: x + 1, dir: "e" };
      if (dir === "s") beam = { y, x: x - 1, dir: "w" };
      if (dir === "e") beam = { y: y - 1, x, dir: "n" };
      if (dir === "w") beam = { y: y + 1, x, dir: "s" };
    } else if (currentLocation === "\\") {
      if (dir === "n") beam = { y, x: x - 1, dir: "w" };
      if (dir === "s") beam = { y, x: x + 1, dir: "e" };
      if (dir === "e") beam = { y: y + 1, x, dir: "s" };
      if (dir === "w") beam = { y: y - 1, x, dir: "n" };
    }
    beams.push(beam);
  };
  let moves = 0;
  while (beams.length > 0) {
    let beam = beams.shift();
    moveBeam(beam);
    moves += 1;
  }

  console.log("Part 1:", count);
});
