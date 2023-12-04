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
  const overlappingCards = [];

  cards.forEach((card) => {
    overlappingCards.push(card[0].filter((val) => card[1].includes(val)));
  });

  overlappingCards.forEach((card) => {
    if (card.length > 0) totalPartOne += 1 * Math.pow(2, card.length - 1);
  });

  console.log("Part 1", totalPartOne);
});
