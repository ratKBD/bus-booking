import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, error, loginUser } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [filltext, setFilltext] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    if (email?.length === 0 || password?.length === 0) {
      setFilltext("Fill the required fields");
    } else {
      setFilltext("");
    }
    const userData = {
      email: email,
      password: password,
    };
    loginUser(userData);
  };

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
        <div className="card p-4 shadow">
          <h2 className="d-flex justify-content-center mb-4">Login</h2>
          <form>
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
            <div className="d-flex justify-content-center ">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
