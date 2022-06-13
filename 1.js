/*
function sum(arr) {
  // ...
}

sum([1, { col: 1.1 }, 'x', '2.2x', ['3', ['x2', '5']]]);
sum(1);
*/

function sum(arr) {
  let sumOfArr = 0;

  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i];
    let value = 0;
    if (Array.isArray(item)) {
      value = sum(item);
    } else if (typeof item === "string") {
      let num;
      try {
        num = parseFloat(item.replace(/[^0-9.]/g, ""));
      } catch (e) {}

      // skip Nan, 0, undefined
      if (num) {
        value = num;
      }
    } else if (typeof item === "number" || typeof item === "bigint") {
      value = item;
    }

    sumOfArr += value;
  }

  return sumOfArr;
}

module.exports = {
  sum,
};
