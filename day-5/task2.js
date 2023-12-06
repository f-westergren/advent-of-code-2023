const fs = require("fs");
const perf = require("execution-time")();

perf.start();

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
      tempMaps.push(
        line.split(" ").map((num, index) => {
          if (index === 2)
            return parseInt(line.split(" ")[1]) + parseInt(num) - 1;
          else return parseInt(num);
        })
      );
    }
    if (line === "" && tempMaps.length > 0) {
      plantMaps.push(tempMaps);
      tempMaps = [];
    }
  });

  const checkDestination = (seed, map) => {
    for (let m of map) {
      if (seed >= m[1] && seed <= m[2]) {
        return m[0] + (seed - m[1]);
      }
    }
    return seed;
  };

  let lowestSeed;
  let tempSeed;

  const checkDest = (seed) => {
    plantMaps.forEach((plantMap) => (seed = checkDestination(seed, plantMap)));
    return seed;
  };

  seeds.forEach((seed, index) => {
    if (index % 2 === 1) {
      let num = 0;
      while (num <= seed) {
        tempSeed = checkDest(seeds[index - 1] + num);
        if (!lowestSeed || tempSeed < lowestSeed) lowestSeed = tempSeed;
        num += 1;
      }
    }
  });

  console.log("Part 2", lowestSeed);

  const results = perf.stop();
  console.log(results);
});

// Runtime:
//     name: 'default',
//     time: 396024.876125,
//     words: '6.6 min',
//     preciseWords: '6.6 min',
//     verboseWords: '6 minutes 36 seconds 24 milliseconds 876 microseconds 125 nanoseconds'
