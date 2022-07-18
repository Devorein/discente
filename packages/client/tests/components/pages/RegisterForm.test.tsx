import { apiConstants, API_VERSION, SERVER_URL } from '@constants';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react';
import { Providers, RegisterForm } from 'components';
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

let registerFormComponent: RenderResult;
let submitButtonElement: HTMLElement;
let nameTextInputElement: HTMLElement;
let usernameTextInputElement: HTMLElement;
let emailTextInputElement: HTMLElement;
let passwordTextInputElement: HTMLElement;

beforeEach(async () => {
  mockGetCurrentUserRequestResponse();
  registerFormComponent = await waitFor(() =>
    render(
      <Providers>
        <RegisterForm />
      </Providers>
    )
  );

  submitButtonElement = registerFormComponent.getByText(
    apiConstants.registerUser.submitButtonText
  );

  nameTextInputElement = registerFormComponent.getByLabelText(
    `${apiConstants.registerUser.label.name} *`
  );

  usernameTextInputElement = registerFormComponent.getByLabelText(
    `${apiConstants.registerUser.label.username} *`
  );

  emailTextInputElement = registerFormComponent.getByLabelText(
    `${apiConstants.registerUser.label.email} *`
  );

  passwordTextInputElement = registerFormComponent.getByLabelText(
    `${apiConstants.registerUser.label.password} *`
  );
});

describe('RegisterForm', () => {
  test('Show correct labels and placeholder in all text inputs & buttons', async () => {
    expect(submitButtonElement).toBeInTheDocument();

    expect(nameTextInputElement).toBeInTheDocument();
    expect(nameTextInputElement.getAttribute('placeholder')).toBe(
      apiConstants.registerUser.placeholder.name
    );

    expect(usernameTextInputElement).toBeInTheDocument();
    expect(usernameTextInputElement.getAttribute('placeholder')).toBe(
      apiConstants.registerUser.placeholder.username
    );

    expect(emailTextInputElement).toBeInTheDocument();
    expect(emailTextInputElement.getAttribute('placeholder')).toBe(
      apiConstants.registerUser.placeholder.email
    );

    expect(passwordTextInputElement).toBeInTheDocument();
    expect(passwordTextInputElement.getAttribute('placeholder')).toBe(
      apiConstants.registerUser.placeholder.password
    );
  });

  test('Show correct error messages when the input fields have invalid inputs and register button is disabled', async () => {
    fireEvent.change(usernameTextInputElement, { target: { value: 'ab' } });
    fireEvent.change(emailTextInputElement, {
      target: { value: 'invalid.email' }
    });
    fireEvent.change(passwordTextInputElement, {
      target: { value: 'weak password' }
    });

    fireEvent.click(usernameTextInputElement);
    fireEvent.click(emailTextInputElement);
    fireEvent.click(passwordTextInputElement);

    await waitFor(() =>
      expect(
        registerFormComponent.getByText(
          'username must be at least 3 characters'
        )
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        registerFormComponent.getByText('Not a valid email')
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        registerFormComponent.getByText('Weak Password')
      ).toBeInTheDocument()
    );

    await waitFor(() => expect(submitButtonElement).toBeDisabled());
  });

  test('Enable register button if all input fields have valid inputs', async () => {
    fireEvent.change(nameTextInputElement, {
      target: { value: 'John Doe' }
    });
    fireEvent.change(usernameTextInputElement, {
      target: { value: 'john.doe' }
    });
    fireEvent.change(emailTextInputElement, {
      target: { value: 'john.doe@gmail.com' }
    });
    fireEvent.change(passwordTextInputElement, {
      target: { value: 'Str0ngPa$$w0rd' }
    });

    await waitFor(() => expect(submitButtonElement).not.toBeDisabled());
  });
});
