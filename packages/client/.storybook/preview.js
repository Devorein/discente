if (typeof global.process === 'undefined') {
  const { worker } = require('../mocks/browser');
  worker.start({
    onUnhandledRequest: 'bypass'
  });
  // Mocking next/router, otherwise You should only use "next/router" on the client side of your app. is thrown
  // https://github.com/vercel/next.js/issues/1827#issuecomment-323314141
  const Router = require('next/router').default;
  const mockedRouter = {
    push: () => {},
    prefetch: () => {},
    route: ''
  };
  Router.router = mockedRouter;
}
