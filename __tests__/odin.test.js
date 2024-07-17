const { capitalize, reverseString } = require("../odin");

describe("capitalize function", () => {
  test("returns string with the first character capitalized", () => {
    const ans = "Hello world";
    expect(capitalize("hello world")).toBe(ans);
  });
});

describe("reverseString function", () => {
  test("returns string reversed", () => {
    const ans = "dlrow olleh";
    expect(reverseString("hello world")).toBe(ans);
  });
});
