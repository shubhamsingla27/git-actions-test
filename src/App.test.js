import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
    render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i,
    });
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement =
        screen.getByLabelText(/confirm password/i);
    if (email) {
        userEvent.type(emailInputElement, email);
    }
    if (password) {
        userEvent.type(passwordInputElement, password);
    }
    if (confirmPassword) {
        userEvent.type(confirmPasswordInputElement, confirmPassword);
    }

    return {
        emailInputElement,
        passwordInputElement,
        confirmPasswordInputElement,
    };
};

const clickSubmitBtn = () => {
    const submitButtonElement = screen.getByRole("button", {
        name: /submit/i,
    });
    userEvent.click(submitButtonElement);
};

test("inputs should be initially empty", () => {
    const emailInputElement = screen.getByRole("textbox");
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement =
        screen.getByLabelText(/confirm password/i);
    expect(emailInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
    expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type email", () => {
    const { emailInputElement } = typeIntoForm({
        email: "test@test.com",
    });
    expect(emailInputElement.value).toBe("test@test.com");
});
test("should be able to type password", () => {
    const { passwordInputElement } = typeIntoForm({
        password: "password!",
    });
    expect(passwordInputElement.value).toBe("password!");
});
test("should be able to type confirm password", () => {
    const { confirmPasswordInputElement } = typeIntoForm({
        confirmPassword: "password!",
    });
    expect(confirmPasswordInputElement.value).toBe("password!");
});

test("show error on invalid email", () => {
    const emailErrorElement = screen.queryByText(
        /the email you input is invalid/i
    );
    expect(emailErrorElement).not.toBeInTheDocument();

    typeIntoForm({
        email: "test.com",
    });
    clickSubmitBtn();

    const emailErrorElementAgain = screen.queryByText(
        /the email you input is invalid/i
    );
    expect(emailErrorElementAgain).toBeInTheDocument();
});

test("if password is less than 5 characters, show error", () => {
    const passwordErrorElement = screen.queryByText(
        /The password should contain 5 or more characters/i
    );

    typeIntoForm({
        email: "selena@test.com",
    });
    expect(passwordErrorElement).not.toBeInTheDocument();

    typeIntoForm({
        password: "123",
    });
    clickSubmitBtn();

    const passwordErrorElementAgain = screen.queryByText(
        /The password should contain 5 or more characters/i
    );
    expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("show error if passwords dont match", () => {
    const confirmPasswordErrorElement = screen.queryByText(
        /the passwords dont match. try again/i
    );

    typeIntoForm({
        email: "selena@test.com",
        password: "12345",
    });
    expect(confirmPasswordErrorElement).not.toBeInTheDocument();
    typeIntoForm({
        confirmPassword: "12346",
    });
    clickSubmitBtn();

    const confirmPasswordErrorElementAgain = screen.queryByText(
        /the passwords dont match. try again/i
    );
    expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test("should show no error if every input is valid", () => {
    typeIntoForm({
        email: "selena@test.com",
        password: "12345",
        confirmPassword: "12345",
    });
    clickSubmitBtn();

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
    expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
