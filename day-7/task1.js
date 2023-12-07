const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let hands = data.toString().replace(/\r\n"/g, "\n").split("\n");

  hands = hands.map((hand) => hand.split(" "));

  const cardRanks = {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    T: 9,
    J: 10,
    Q: 11,
    K: 12,
    A: 13,
  };

  function countCards(str, find) {
    return str.split(find).length - 1;
  }

  const checkHand = (hand) => {
    let check = [...new Set(hand)];
    switch (check.length) {
      case 1:
        return 6;
      case 2:
        let count = countCards(hand, hand[0]);
        if (count === 1 || count === 4) return 5;
        return 4;
      case 3:
        let counts = check.map((card) => countCards(hand, card));
        if (counts.includes(3)) return 3;
        return 2;
      case 4:
        return 1;
      default:
        return 0;
    }
  };

  const compareHands = (a, b) => {
    for (let i in a) {
      if (cardRanks[a[i]] > cardRanks[b[i]]) return a;
      else if (cardRanks[a[i]] < cardRanks[b[i]]) return b;
    }
  };

  const sortHand = (a, b) => {
    if (compareHands(a[0], b[0]) === a[0]) {
      return 1;
    } else if (compareHands(a[0], b[0]) === b[0]) {
      return -1;
    }
    return 0;
  };

  let sortedHands = [[], [], [], [], [], [], []];

  hands = hands.map((hand) => {
    const n = checkHand(hand[0]);
    sortedHands[n].push(hand);
  });

  sortedHands = sortedHands.map((hands) => hands.sort(sortHand)).flat();

  let total = 0;

  sortedHands.forEach((hand, index) => {
    total += parseInt(hand[1]) * (index + 1);
  });

  console.log("Part 1", total);
});
