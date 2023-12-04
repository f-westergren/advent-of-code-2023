const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let cards = data
    .toString()
    .replace(/\r\n"/g, "\n")
    .replace(/Card.*?:\s/g, "")
    .split("\n");
  cards = cards.map((card) => card.replace(/\s\s/g, " ").split(" | "));
  cards = cards.map((card) => (card = card.map((c) => (c = c.split(" ")))));

  let totalPartOne = 0;
  let overlappingCards = [];

  cards.forEach((card) => {
    overlappingCards.push(card[0].filter((val) => card[1].includes(val)));
  });

  overlappingCards = overlappingCards.map((card) => {
    if (card.length > 0) totalPartOne += 1 * Math.pow(2, card.length - 1);
    return [card.length, 1];
  });

  overlappingCards.forEach((card, index) => {
    for (let i = 0; i < card[1]; i++) {
      let j = 1;
      while (j <= card[0]) {
        overlappingCards[index + j][1] += 1;
        j += 1;
      }
    }
  });

  let totalPartTwo = overlappingCards
    .map((card) => card[1])
    .reduce((total, a) => total + a, 0);

  console.log("Part 1", totalPartOne);
  console.log("Part 2", totalPartTwo);
});
