const fs = require("fs");
const perf = require("execution-time")();

perf.start();

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let lava = data.toString().replace(/\r\n"/g, "\n").split("\n");
  let rows = [];
  let lavaMaps = [];
  lava.forEach((row) => {
    if (row === "") {
      lavaMaps.push(rows);
      rows = [];
    } else {
      rows.push(row);
    }
  });

  const createColumns = (lavaMap) => {
    let columns = [];
    for (let i = 0; i < lavaMap[0].length; i++) {
      let column = "";
      lavaMap.forEach((row) => {
        column = column + row[i];
      });
      columns.push(column);
    }
    return columns;
  };

  const check = (map) => {
    let start = 0;
    let end = map.length - 1;

    while (start < end) {
      if (map[start] !== map[end]) return false;
      else {
        start += 1;
        end -= 1;
      }
    }
    return true;
  };

  const checkFromStart = (map, mapLength) => {
    if (map.length < 2) {
      return false;
    }

    if (map.length % 2 !== 0) return checkFromStart(map.slice(1), mapLength);

    if (check(map)) {
      return map.length / 2 + mapLength - map.length;
    } else return checkFromStart(map.slice(1), mapLength);
  };

  const checkFromEnd = (map) => {
    if (map.length < 2) {
      return false;
    }

    if (map.length % 2 !== 0) return checkFromEnd(map.slice(0, -1));

    if (check(map)) {
      return map.length / 2;
    } else return checkFromEnd(map.slice(0, -1));
  };

  let total = 0;

  lavaMaps.forEach((map) => {
    const columnMap = createColumns(map);
    if (checkFromStart(map, map.length)) {
      total += checkFromStart(map, map.length) * 100;
    } else if (checkFromEnd(map)) {
      total += checkFromEnd(map) * 100;
    } else if (checkFromStart(columnMap, columnMap.length)) {
      total += checkFromStart(columnMap, columnMap.length);
    } else if (checkFromEnd(columnMap)) {
      total += checkFromEnd(columnMap);
    }
  });

  console.log("Part 1:", total);

  const results = perf.stop();
  console.log(results);
});
