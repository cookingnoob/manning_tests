class PasswordVerifier1 {
  constructor() {
    this.rules = [];
  }
  addRule(rule) {
    this.rules.push(rule);
  }

  verify(input) {
    const errors = [];
    this.rules.forEach((rule) => {
      const result = rule(input);
      if (!result.passed) {
        errors.push(`error ${result.reason}`);
      }
    });
    return errors;
  }
}

module.exports = PasswordVerifier1;
