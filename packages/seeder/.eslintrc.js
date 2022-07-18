const path = require('path');
const eslintConfig = require('../../.eslintrc');

eslintConfig.parserOptions.project = [path.join(__dirname, './tsconfig.json')];
eslintConfig.rules["import/no-extraneous-dependencies"] = "off";

module.exports = eslintConfig;
