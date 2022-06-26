const path = require("path");

/**
 * Configuration copied from
 * https://nextjs.org/docs/testing
 * */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!./src/middlewares/logger.ts',
    '!./src/utils/logger.ts',
    '!./src/routers/index.ts',
    '!./src/middlewares/index.ts',
    '!./src/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'jest-environment-node',
  testMatch: [path.join(__dirname, './tests/**/*.test.ts')],
  testTimeout: 30000,
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  globalTeardown: path.join(__dirname, '/tests/testTeardown.ts'),
  globalSetup: path.join(__dirname, '/tests/testSetup.ts')
};