import React from "react";
import { useState } from "react";
import { useContext } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const { signIn } = useContext(AuthContext);
  const NavigateTo = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        NavigateTo(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h2 className="title">Login</h2>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Your password"
            required
          />
          <p
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? <span>Hide Password</span> : <span>Show Password</span>}
          </p>
        </div>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <p>
        New to Ema-John? <Link to="/signup">Create A New Account</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
