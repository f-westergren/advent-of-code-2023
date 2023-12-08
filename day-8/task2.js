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

  let startingNodes = [];
  let directions = nodeMap[0].split("");
  let ghostSteps = [];

  nodeMap.forEach((node) => {
    let n = node.slice(0, 3);
    if (n.slice(0, 3).match(/A$/)) startingNodes.push(n);
  });

  startingNodes.forEach((node) => {
    let steps = 0;
    let current = node;
    while (!current.match(/Z$/)) {
      for (let dir of directions) {
        if (dir === "L") current = nodes[current][0];
        if (dir === "R") current = nodes[current][1];
        steps += 1;
        if (current.match(/Z$/)) {
          ghostSteps.push(steps);
          break;
        }
      }
    }
  });

  const gcd = (a, b) => (a ? gcd(b % a, a) : b);
  const lcm = (a, b) => a * (b / gcd(a, b));
  ghostSteps = ghostSteps.reduce(lcm);

  console.log("Part 2:", ghostSteps);
});
