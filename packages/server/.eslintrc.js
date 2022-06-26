const path = require('path');
const eslintConfig = require('../../.eslintrc');

eslintConfig.parserOptions.project = [path.join(__dirname, './tsconfig.eslintrc.json')];
eslintConfig.rules["no-undef"] = "off";
eslintConfig.rules["no-unused-vars"] = "off";
eslintConfig.rules["no-redeclare"] = "off";
eslintConfig.rules["no-use-before-define"] = "off";
eslintConfig.rules["jest/expect-expect"] = [
  "error",
  {
    "assertFunctionNames": ["expect", "expect*", "assertSupertestErrorRequest", "assertSupertestSuccessRequest"]
  }
]
eslintConfig.rules["import/no-extraneous-dependencies"] = "off"

eslintConfig.overrides = [
  {
    "files": ["tests/**"],
    "plugins": ["jest"],
    "extends": ["plugin:jest/recommended"],
    rules: {
      "jest/no-focused-tests": "off"
    }
  }
]


module.exports = eslintConfig;