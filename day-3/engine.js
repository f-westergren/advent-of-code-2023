const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  const values = data.toString().replace(/\r\n/g, "\n").split("\n");
  let totalPartOne = [];
  let totalPartTwo = 0;

  let schematic = values.map((val) => val.replace(/^[^:]*:/, ""));
  schematic = schematic.map(s => s.split(''));

  const findNum = (y, x) => {
    let num = schematic[y][x];

    // Check right
    let right = x+1;
    while (right < schematic[y].length && schematic[y][right].match(/\d/)) {
        num += schematic[y][right];
        right += 1
    }

    // Check left
    let left = x-1;
    while (left > -1 && schematic[y][left].match(/\d/)) {
        num = schematic[y][left] + num;
        left -= 1
    }

    return num;
  }

  let tempTotal = [];

  const check = (y, x) => {
    const val = schematic[y][x];
    if (!val) return false;
    if (val.match(/\d/)) tempTotal.push(findNum(y, x));
}

  const checkAround = (y, x) => {
    if (y === 0) {
        check(y, x-1);
        check(y+1, x-1);
        check(y, x+1);
        check(y+1, x+1);
    } else if (y === schematic.length -1) {
        check(y-1, x);
        check(y-1, x-1);
        check(y-1, x+1);
        check(y, x+1);
        check(y, x-1);
    } else {
        check(y+1, x);
        check(y-1, x);
        check(y, x-1);
        check(y+1, x-1);
        check(y-1, x-1);
        check(y, x+1);
        check(y+1, x+1);
        check(y-1, x+1);
    }
    totalPartOne.push(...new Set(tempTotal))
    tempTotal = [];
  }



  for (let y = 0;y < schematic.length;y++) {
    for (let x = 0;x < schematic[y].length;x++) {
        if (!schematic[y][x].match(/\d|\./)) {
            checkAround(y, x)
        }
    }
  }

  console.log('Part 1', totalPartOne.reduce((a, b) => parseInt(a) + parseInt(b), 0))
});
