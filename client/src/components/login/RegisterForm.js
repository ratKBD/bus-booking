import React, { useState } from "react";
import useSignUp from "../../hooks/useSignUp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RegisterForm = () => {
  const { loading, error, registeredUser } = useSignUp();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [filltext, setFilltext] = useState("");

  const handleRegister = () => {
    if (
      name?.length === 0 ||
      email?.length === 0 ||
      password?.length === 0 ||
      passwordConfirm?.length === 0
    ) {
      setFilltext("Fill the required fields");
    } else {
      setFilltext("");
    }
    const userData = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    registeredUser(userData);
    console.log("User Data:", userData);
  };

  console.log("regError-->", error);

  return (
    <>
      <div className="d-flex justify-content-between  m-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow d-flex justify-content-center align-items-center">
          <h2 className="mb-4">Register</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Full Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Confirm Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setpasswordConfirm(e.target.value)}
              />
            </div>

            {filltext?.length > 0 ? (
              <div class="alert alert-danger" role="alert">
                <a href="#" class="alert-link">
                  {filltext}
                </a>
              </div>
            ) : error?.length > 0 ? (
              <div class="alert alert-danger" role="alert">
                <a href="#" class="alert-link">
                  {error}
                </a>
              </div>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
