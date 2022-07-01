import { useState } from "react";
import "./App.css";
import validator from "validator";

function App() {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handelChange = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signupInput.email)) {
      return setError("The email you input is invalid.");
    } else if (signupInput.password.length < 5) {
      return setError("The password should contain 5 or more characters");
    } else if (signupInput.password != signupInput.confirmPassword) {
      return setError("The passwords dont match. Try again");
    }
  };

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-lable">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control "
            value={signupInput.email}
            onChange={handelChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-lable">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signupInput.password}
            onChange={handelChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-lable">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={signupInput.confirmPassword}
            onChange={handelChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
