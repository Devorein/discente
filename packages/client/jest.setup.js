// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { setupServer } from 'msw/node';
import { setLogger } from 'react-query';

export const server = setupServer();

// Establish API mocking before all tests.
beforeAll(() => {
  const noop = () => {};

  // Make loggers noop to not clutter the console for failed api requests
  setLogger({
    error: noop,
    log: noop,
    warn: noop
  });
  server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
