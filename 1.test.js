const assert = require("assert");
const sum = require("./1").sum;

describe("Problem 1", function () {
  it("should return 6", function () {
    assert.equal(sum([1, 2, 3]), 6);
  });

  it("should return 13.2", function () {
    assert.equal(sum([1, 'x', '2.2x', ['3', ['x2', '5']]]), 13.2);
  });
});
