const fs = require("fs");

fs.readFile("input.txt", function read(err, data) {
  if (err) {
    throw err;
  }

  const numbers = [
    null,
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const values = data.toString().replace(/\r\n/g, "\n").split("\n");
  let totalPartOne = 0;
  let totalPartTwo = 0;

  const combineFirstAndLast = (string) =>
    parseInt(
      string.replace(/^\D+/g, "")[0] + string.replace(/\D+$/g, "").slice(-1)
    );
  values.forEach((value) => (totalPartOne += combineFirstAndLast(value)));

  const getFirstAndLast = (value) => {
    let arr = value.split("");
    let first = "";
    let last = "";

    for (char of arr) {
      if (/^\d+$/.test(char)) {
        first = char;
        break;
      }
      first += char;
      if (numbers.indexOf(first) !== -1) {
        first = numbers.indexOf(first).toString();
        break;
      } else {
        let num = numbers.filter((n) => first.includes(n));
        if (num.length > 0) {
          first = numbers.indexOf(num[0]).toString();
          break;
        }
      }
    }

    for (let i = arr.length - 1;i >= 0;i--) {
      if (/^\d+$/.test(arr[i])) {
        last = arr[i];
        break;
      }
      last = arr[i] + last;
      if (numbers.indexOf(last) !== -1) {
        last = numbers.indexOf(last).toString();
        break;
      } else {
        let num = numbers.filter((n) => last.includes(n));
        if (num.length > 0) {
          last = numbers.indexOf(num[0]).toString();
          break;
        }
      }
    }

    return parseInt(first + last);
  };

  values.forEach((val) => (totalPartTwo += getFirstAndLast(val)));

  console.log(`First part: ${totalPartOne}`);
  console.log(`Second part: ${totalPartTwo}`);
});
