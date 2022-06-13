const assert = require("assert");
const second = require("./2");

describe("Problem 2", function () {
  describe("convertPath", function () {
    it("default case", function () {
      assert.deepEqual(second.convertPath("a.b.c.d"), ["a", "b", "c", "d"]);
    });

    it("includes array index", function () {
      assert.deepEqual(second.convertPath("a[1].b[2]"), ["a", 1, "b", 2]);
    });

    it("leading dot", function () {
      assert.deepEqual(second.convertPath(".a.b[1].c"), ["a", "b", 1, "c"]);
    });

    it("not array", function () {
      assert.deepEqual(second.convertPath("a.b[1x].c"), ["a", "b", "1x", "c"]);
    });
  });

  describe("get", function () {
    let obj;

    beforeEach(function () {
      // runs before each test in this block
      obj = {
        a: {
          b: {
            c: "init_1",
          },
          b1: ["init_2", "init_3", { c1: "init_7" }],
          b2: "init_4",
        },
        a1: ["init_5", { b2: "init_6" }],
      };
    });

    it("default case", function () {
      assert.equal(second.get(obj, "a.b.c"), obj.a.b.c);
    });

    it("leading dot", function () {
      assert.equal(second.get(obj, ".a.b.c"), obj.a.b.c);
    });

    it("includes array index", function () {
      assert.equal(second.get(obj, "a1[0]"), obj.a1[0]);
    });

    it("complex", function () {
      assert.equal(second.get(obj, "a.b1[2].c1"), obj.a.b1[2].c1);
    });

    it("returns object", function () {
      assert.deepEqual(second.get(obj, "a.b1"), obj.a.b1);
    });

    it("error", function () {
      assert.throws(function () {
        console.log(second.get(obj, "a.b1.b2[2]"));
      }, Error);
    });
  });

  describe("processOverrides", function () {
    it("default case", function () {
      assert.deepEqual(
        second.processOverrides(
          { 1: 2, a: { 3: 4 }, patchable: ["a.3"] },
          { a: { 3: 100 } }
        ),
        { 1: 2, a: { 3: 100 } }
      );
    });
  });
});
