const { capitalize } = require("../odin");
describe("capitalize function", () => {
  test("takes a string and returns it with the first character capitalized", () => {
    const ans = "Hello world";
    expect(capitalize("hello world")).toBe(ans);
  });
});
