const verifyPassword = require("../password");
describe("verifyPassword", () => {
  describe("Given a failing rule", () => {
    const fakeRule = (input) => ({ passed: false, reason: "fake reason" });

    test("Returns errors", () => {
      const errors = verifyPassword("any value", [fakeRule]);

      expect(errors[0]).toContain("fake reason");
    });
  });
});
