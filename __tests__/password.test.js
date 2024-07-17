const {
  PasswordVerifier1,
  oneUpperCaseRule,
  verifyPassword2,
} = require("../password");

const makeVerifier = () => new PasswordVerifier1();
const passingRule = (input) => ({ passed: true, reason: "" });

const makeVerifierWithPassingRule = () => {
  const verifier = makeVerifier();
  verifier.addRule(passingRule);
  return verifier;
};

const makeVerifierWithFailedRule = (reason) => {
  const verifier = makeVerifier();
  const fakeRule = (input) => ({ passed: false, reason: reason });
  verifier.addRule(fakeRule);
  return verifier;
};

describe("PasswordVerifier1", () => {
  describe("Given a failing rule", () => {
    test("has an error message based on the rule.reason", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any input");
      expect(errors[0]).toContain("fake reason");
    });

    test("has exactly one error", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any input");
      expect(errors.length).toBe(1);
    });
  });

  describe("with a passing rule", () => {
    it("has no errors", () => {
      const verifier = makeVerifierWithPassingRule();
      const errors = verifier.verify("any input");
      expect(errors.length).toBe(0);
    });
  });

  describe("with a failing and a passing rule", () => {
    it("has one error", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRule(passingRule);
      const errors = verifier.verify("any input");
      expect(errors.length).toBe(1);
    });
    it("error text belongs to failed rule", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRule(passingRule);
      const errors = verifier.verify("any input");
      expect(errors[0]).toContain("fake reason");
    });
  });
});

describe("one uppercase rule", function () {
  test("given no uppercase, it fails", () => {
    const result = oneUpperCaseRule("abc");
    expect(result.passed).toEqual(false);
  });
  test.each([
    ["Abc", true],
    ["aBc", true],
    ["abc", false],
  ])("given one uppercase, it passes", (input, expectedResult) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(expectedResult);
  });
});

test("verify, with no rules, throws exception", () => {
  const verifier = makeVerifier();
  expect(() => verifier.verify("any input")).toThrow(/no rules configured/);
});

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;
const makeVerifierFactory = (rules, dayOfWeekFn) => {
  return function (input) {
    if ([SATURDAY, SUNDAY].includes(dayOfWeekFn())) {
      throw new Error("It's the weekend!");
    }
    //more code goes here..
  };
};
describe("verifier2 - dummy object", () => {
  test("on weekends, throws exceptions", () => {
    const alwaysSunday = () => SUNDAY;
    const verifyPassword = makeVerifierFactory([], alwaysSunday);
    expect(() => verifyPassword("anything")).toThrow("It's the weekend");
  });
});
