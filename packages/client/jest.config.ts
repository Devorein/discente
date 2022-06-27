const nextJest = require('next/jest');
const path = require('path');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
  transformIgnorePatterns: ['/node_modules/', '/.next/'],
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testMatch: [path.join(__dirname, './tests/**/*.test.ts?(x)')],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/components/$1',
    '^components$': '<rootDir>/components',
    '^api/(.*)$': '<rootDir>/api/$1',
    '^api$': '<rootDir>/api',
    '^hooks/(.*)$': '<rootDir>/hooks/$1',
    '^hooks$': '<rootDir>/hooks',
    '^utils/(.*)$': '<rootDir>/utils/$1',
    '^utils$': '<rootDir>/utils',
    '^contexts/(.*)$': '<rootDir>/contexts/$1',
    '^contexts$': '<rootDir>/contexts',
    '^@constants$': '<rootDir>/@constants/index.ts'
  }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
