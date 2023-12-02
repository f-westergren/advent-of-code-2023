const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  const cubes = {
    r: 12,
    g: 13,
    b: 14,
  };

  const values = data.toString().replace(/\r\n/g, "\n").split("\n");
  let totalPartOne = 0;

  let games = values.map((val) => val.replace(/^[^:]*:/, "").trim());
  games = games.map((val) => val.replace(/;|,|lue|ed|reen/g, ""));

  const checkIfPossible = (game) => {
    let possible = true;
    while (game.length > 0) {
      const matches = game.match(/([^\s]+)\s([^\s]*)/);
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

  games.forEach((game, index) => {
    if (checkIfPossible(game)) totalPartOne += index + 1;
  });

  console.log("Part 1", totalPartOne);
});
