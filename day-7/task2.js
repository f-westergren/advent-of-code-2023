const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  let hands = data.toString().replace(/\r\n"/g, "\n").split("\n");
  hands = hands.map((hand) => hand.split(" "));
  let total = 0;

  const cardRanks = {
    J: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    Q: 11,
    K: 12,
    A: 13,
  };

  function countCards(str, find) {
    return str.split(find).length - 1;
  }

  const checkHand = (hand) => {
    let jokers = (hand.match(/J/g)||[]).length;
    if (jokers === 5) return 6;
    check = [...new Set(hand)];
    switch (check.length) {
      case 1: 
        return 6; // Five of a kind 
      case 2: 
        let count = countCards(hand, hand[0]);
        if (count === 1 || count === 4)  {
            if (jokers > 0) return 6; // Five of a kind 
            return 5; // Four of a kind
        }
        if (jokers > 1) return 6; // Five of a kind
        return 4; // Full house
      case 3: 
        let counts = check.map((card) => countCards(hand, card));
        if (counts.includes(3)) {
            if (jokers === 1) return 5; // Four of a kind
            if (jokers > 1) return 6; // Five of a kind
            return 3; // Three of a kind
        }
        if (jokers === 1) return 4; // Full house
        if (jokers === 2) return 5; // Four of a kind
        if (jokers > 2) return 6; // Five of a kind
        return 2;
      case 4: 
        if (jokers === 1) return 3; // Three of a kind
        if (jokers === 2) return 3; // Three of a kind
        return 1;
      case 5:
          if (jokers === 1) return 1; // One pair
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

  sortedHands.forEach((hand, index) => {
    total += parseInt(hand[1]) * (index + 1);
  });

  console.log("Part 2", total);
});
