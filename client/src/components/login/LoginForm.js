import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow  d-flex justify-content-center align-items-center">
        <h2 className="mb-4">Login for Bus Booking</h2>
        <form>{/* Login form fields */}</form>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <div className="mt-3">
          <span>New User? </span>
          <button
            type="button"
            className="btn btn-link"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
