const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let nodeMap = data
    .toString()
    .replace(/\r\n"/g, "\n")
    .replace(/\s=\s\(/g, ", ")
    .replace(/\)/g, "")
    .split("\n");

  let nodes = {};
  nodeMap.forEach((node, index) => {
    if (index > 1) {
      node = node.split(", ");
      nodes[node[0]] = [node[1], node[2]];
    }
  });

  let directions = nodeMap[0].split("");
  let current = "AAA";
  let steps = 0;

  while (current !== "ZZZ") {
    for (let dir of directions) {
      if (dir === "L") current = nodes[current][0];
      if (dir === "R") current = nodes[current][1];
      steps += 1;
      if (current === "ZZZ") break;
    }
  }

  console.log("Part 1:", steps);
});
