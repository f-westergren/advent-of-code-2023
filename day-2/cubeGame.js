const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  const values = data.toString().replace(/\r\n/g, "\n").split("\n");
  let totalPartOne = 0;
  let totalPartTwo = 0;

  let games = values.map((val) => val.replace(/^[^:]*:/, "").trim());
  games = games.map((val) => val.replace(/;|,|lue|ed|reen/g, ""));

  const checkIfPossible = (game) => {
    let cubes = {
      r: 12,
      g: 13,
      b: 14,
    };
    let possible = true;
    while (game.length > 0) {
      let matches = game.match(/([^\s]+)\s([^\s]*)/);
      if (matches === null) break;

      if (cubes[matches[2]] < matches[1]) {
        possible = false;
        break;
      } else {
        game = game.replace(matches[0], "");
      }
    }
    return possible;
  };

  const checkLowest = (game) => {
    let cubes = {
      r: 0,
      g: 0,
      b: 0,
    };
    while (game.length > 0) {
      const matches = game.match(/([^\s]+)\s([^\s]*)/);
      if (matches === null) break;

      if (cubes[matches[2]] < matches[1] || cubes[matches[2]] === 0) {
        cubes[matches[2]] = parseInt(matches[1]);
        game = game.replace(matches[0], "").trim();
      } else {
        game = game.replace(matches[0], "").trim();
      }
    }
    return cubes.r * cubes.g * cubes.b;
  };

  games.forEach((game, index) => {
    if (checkIfPossible(game)) totalPartOne += index + 1;
  });

  games.forEach((game) => {
    totalPartTwo += checkLowest(game);
  });

  console.log("Part 1", totalPartOne);
  console.log("Part 1", totalPartTwo);
});
