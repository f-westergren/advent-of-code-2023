const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let pipeMap = data.toString().replace(/\r\n"/g, "\n").split("\n");
  pipeMap = pipeMap.map((m) => [...m.split("")]);
  let position = {};
  let direction;
  let steps = 0;
  let finish;

  pipeMap.forEach((m, i) => {
    if (m.indexOf("S") !== -1) {
      position.x = m.indexOf("S");
      position.y = i;
      finish = `${position.y}-${position.x}`;
    }
  });

  const pipes = {
    "|": ["n", "s"],
    "-": ["e", "w"],
    L: ["n", "e"],
    J: ["n", "w"],
    7: ["s", "w"],
    F: ["s", "e"],
  };

  const findStartingDirection = () => {
    const { y, x } = position;

    if (pipeMap[y - 1] && ["|", "7", "F"].includes(pipeMap[y - 1][x]))
      return "n";
    if (pipeMap[y + 1] && ["|", "L", "J"].includes(pipeMap[y + 1][x]))
      return "s";
    if (["-", "7", "J"].includes(pipeMap[y][x + 1])) return "e";
    if (["-", "F", "L"].includes(pipeMap[y][x - 1])) return "w";
  };

  const walk = (dir) => {
    pipeMap[position.y][position.x] = "X";

    if (dir === "n") position.y -= 1;
    if (dir === "s") position.y += 1;
    if (dir === "e") position.x += 1;
    if (dir === "w") position.x -= 1;
    steps += 1;
  };

  const checkDirection = (dir) => {
    const { y, x } = position;
    switch (dir) {
      case "n":
        if (pipeMap[y - 1][x] === "X") return false;
        return true;
      case "s":
        if (pipeMap[y + 1][x] === "X") return false;
        return true;
      case "e":
        if (pipeMap[y][x + 1] === "X") return false;
        return true;
      case "w":
        if (pipeMap[y][x - 1] === "X") return false;
        return true;
    }
  };

  const setDirection = () => {
    const { y, x } = position;
    direction = checkDirection(pipes[pipeMap[y][x]][0])
      ? pipes[pipeMap[y][x]][0]
      : pipes[pipeMap[y][x]][1];
  };

  direction = findStartingDirection();
  walk(direction);

  while (`${position.y}-${position.x}` !== finish) {
    setDirection();
    walk(direction);
  }

  console.log("Part 1:", steps / 2);
  const results = perf.stop();
  console.log(results);
});
