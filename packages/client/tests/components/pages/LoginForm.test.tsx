import { apiConstants, API_VERSION, SERVER_URL } from '@constants';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react';
import { LoginForm, Providers } from 'components';
import { rest } from 'msw';
import { server } from '../../../jest.setup';

function mockGetCurrentUserRequestResponse() {
  server.use(
    rest.get(`${SERVER_URL}/${API_VERSION}/auth/me`, (_, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          status: 'error',
          error: 'Not authenticated'
        })
      )
    )
  );
}

let loginFormComponent: RenderResult;
let submitButtonElement: HTMLElement;
let usernameOrEmailTextInputElement: HTMLElement;
let passwordTextInputElement: HTMLElement;

beforeEach(async () => {
  mockGetCurrentUserRequestResponse();
  loginFormComponent = await waitFor(() =>
    render(
      <Providers>
        <LoginForm />
      </Providers>
    )
  );

  submitButtonElement = loginFormComponent.getByText(
    apiConstants.loginUser.submitButtonText
  );

  // Asterisk to indicate required field
  usernameOrEmailTextInputElement = loginFormComponent.getByLabelText(
    `${apiConstants.loginUser.label.usernameOrEmail} *`
  );

  passwordTextInputElement = loginFormComponent.getByLabelText(
    `${apiConstants.loginUser.label.password} *`
  );
});

describe('LoginForm', () => {
  test('Show correct labels and placeholder in all text inputs & buttons', async () => {
    expect(submitButtonElement).toBeInTheDocument();

    expect(usernameOrEmailTextInputElement).toBeInTheDocument();
    expect(usernameOrEmailTextInputElement.getAttribute('placeholder')).toBe(
      apiConstants.loginUser.placeholder.usernameOrEmail
    );

    expect(passwordTextInputElement).toBeInTheDocument();
    expect(passwordTextInputElement.getAttribute('placeholder')).toBe(
      apiConstants.loginUser.placeholder.password
    );
  });

  test('Enable login button if all input fields have valid inputs', async () => {
    fireEvent.change(usernameOrEmailTextInputElement, {
      target: { value: 'john.doe' }
    });
    fireEvent.change(passwordTextInputElement, {
      target: { value: 'Str0ngPa$$w0rd' }
    });

    await waitFor(() =>
      expect(
        loginFormComponent.getByText(apiConstants.loginUser.submitButtonText)
      ).not.toBeDisabled()
    );
  });
});
