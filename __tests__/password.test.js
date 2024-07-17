const PasswordVerifier1 = require("../password");

describe("PasswordVerifier1", () => {
  let verifier;
  beforeEach(() => (verifier = new PasswordVerifier1()));
  describe("Given a failing rule", () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = (input) => ({ passed: false, reason: "fake reason" });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });

    test("has an error message based on the rule.reason", () => {
      expect(errors[0]).toContain("fake reason");
    });

    test("has exactly one error", () => {
      expect(errors.length).toBe(1);
    });
  });
  describe("with a passing rule", () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = (input) => ({ passed: true, reson: "" });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });
    it("has no errors", () => {
      expect(errors.length).toBe(0);
    });
  });
  describe("with a failing and a passing rule", () => {
    let fakeRulePass, fakeRuleFail, errors;
    beforeEach(() => {
      fakeRulePass = (input) => ({ passed: true, reason: "fake success" });
      fakeRuleFail = (input) => ({ passed: false, reason: "fake reason" });
      verifier.addRule(fakeRulePass);
      verifier.addRule(fakeRuleFail);
      errors = verifier.verify("any value");
    });
    it("has one error", () => {
      expect(errors.length).toBe(1);
    });
    it("error text belongs to failed rule", () => {
      expect(errors[0]).toContain("fake reason");
    });
  });
});
