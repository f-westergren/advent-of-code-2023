const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let map = data
    .toString()
    .replace(/\r\n"/g, "\n")
    .replace(/\smap.*?:\s/g, "\n")
    .split("\n");

  let seeds;
  let tempMaps = [];
  let plantMaps = [];

  map.forEach((line) => {
    if (line.startsWith("seeds:")) {
      seeds = line
        .match(/(?<=seeds:\s).*$/)[0]
        .split(" ")
        .map((seed) => parseInt(seed));
    }
    if (/^\d/.test(line)) {
      tempMaps.push(line.split(" ").map((num) => parseInt(num)));
    }
    if (line === "" && tempMaps.length > 0) {
      plantMaps.push(tempMaps);
      tempMaps = [];
    }
  });

  const checkDestination = (seed, map) => {
    for (let m of map) {
      if (seed >= m[1] && seed <= m[1] + m[2]) {
        return m[0] + (seed - m[1]);
      }
    }
    return seed;
  };

  plantMaps.forEach(
    (m) => (seeds = seeds.map((seed) => checkDestination(seed, m)))
  );

  console.log(
    "Part 1",
    seeds.reduce((a, b) => Math.min(a, b))
  );
});
