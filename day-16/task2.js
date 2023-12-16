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

  let count = 0;
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

  const checkBeams = (beam) => {
    beams.push(beam);
    while (beams.length > 0) {
      let beam = beams.shift();
      moveBeam(beam);
    }
  };

  let memo = {};
  let beams = [];
  let tempCount = 0;

  const reset = () => {
    if (count > tempCount) tempCount = count;
    caveCopy = JSON.parse(JSON.stringify(cave));
    count = 0;
    memo = {};
  };
  let i = 0;
  while (i < cave.length) {
    checkBeams({ y: i, x: 0, dir: "e" });
    reset();
    checkBeams({ y: i, x: cave[0].length - 1, dir: "w" });
    reset();
    i++;
  }

  i = 0;
  while (i < cave[0].length) {
    checkBeams({ y: 0, x: i, dir: "s" });
    reset();
    checkBeams({ y: cave.length - 1, x: i, dir: "n" });
    reset();
    i++;
  }

  console.log("Part 2:", tempCount);
  const results = perf.stop();
  console.log(results);
});
