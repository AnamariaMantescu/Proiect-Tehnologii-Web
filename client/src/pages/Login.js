import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../service/loginService";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

import "./Login.css";

const Login = () => {
  // Use state hooks to keep track of the input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Use the useNavigate hook to navigate to a different route
  const navigate = useNavigate();

  // Use the useDispatch hook to dispatch actions to the store
  const dispatch = useDispatch();

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = await loginService(email, password);
    if (data.length > 0) {
      // Dispatch an action to set the user in the store
      dispatch(setUser(data[0].id));
      navigate("/home", { state: { login: true, userId: data[0].id } });
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <br />
            {error}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
