class PasswordVerifier1 {
  constructor() {
    this.rules = [];
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  verify(input) {
    if (this.rules.length === 0) {
      throw new Error("no rules configured");
    }
    const errors = [];
    this.rules.forEach((rule) => {
      const result = rule(input);
      if (result.passed === false) {
        errors.push(result.reason);
      }
    });
    return errors;
  }
}

const oneUpperCaseRule = (input) => {
  return {
    passed: input.toLowerCase() !== input,
    reason: "at least one upper case needed",
  };
};
const SUNDAY = 0,
  SATURDAY = 6;
const verifyPassword2 = (input, rules, getDayFn) => {
  const dayOfWeek = getDayFn();
  if ([SATURDAY, SUNDAY].includes(dayOfWeek)) {
    throw Error("It's the weekend!");
  }
  //more code goes here...
  //return list of errors found..
  return [];
};

module.exports = { PasswordVerifier1, oneUpperCaseRule, verifyPassword2 };
