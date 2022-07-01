import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("inputs should be initially empty", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type email", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  userEvent.type(emailInputElement, "test@test.com");
  expect(emailInputElement.value).toBe("test@test.com");
});

test("should be able to type password", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "password!");
  expect(passwordInputElement.value).toBe("password!");
});
test("should be able to type confirm password", () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, "password!");
  expect(confirmPasswordInputElement.value).toBe("password!");
});

test("show error on invalid email", () => {
  render(<App />);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "test.com");

  userEvent.click(submitButtonElement);

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );
  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("if password is less than 5 characters, show error", () => {
  render(<App />);

  const passwordErrorElement = screen.queryByText(
    /The password should contain 5 or more characters/i
  );

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  const passwordInputElement = screen.getByLabelText("Password");

  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, "selena@test.com");
  expect(passwordErrorElement).not.toBeInTheDocument();
  userEvent.type(passwordInputElement, "123");
  userEvent.click(submitButtonElement);

  const passwordErrorElementAgain = screen.queryByText(
    /The password should contain 5 or more characters/i
  );
  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("show error if passwords dont match", () => {
  render(<App />);

  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords dont match. try again/i
  );

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, "selena@test.com");
  userEvent.type(passwordInputElement, "12345");
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  userEvent.type(confirmPasswordInputElement, "12346");
  userEvent.click(submitButtonElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the passwords dont match. try again/i
  );
  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test("should show no error if every input is valid", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, "selena@test.com");
  userEvent.type(passwordInputElement, "12345");
  userEvent.type(confirmPasswordInputElement, "12345");
  userEvent.click(submitButtonElement);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const passwordErrorElement = screen.queryByText(
    /The password should contain 5 or more characters/i
  );
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords dont match. try again/i
  );

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  // expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
