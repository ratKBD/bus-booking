import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { login, token } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (values) => {
    console.log("login-->", values);

    try {
      setError(null);
      setLoading(true); // Corrected this line to set loading to true
      const res = await fetch("http://localhost:8001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("data111-->", res);
      const data = await res.json();

      if (res.status === 200) {
        console.log("successs--", token);
        message.success(data.message);
        login(data.token, data.user);
        navigate("/booking");
      } else if (res.status === 404) {
        // Corrected property name to status
        console.log("failed2");
        setError(data.message);
      } else if (res.status === 400) {
        // Corrected property name to status
        console.log("failed2");
        setError(data.message);
      } else if (res.status === 401) {
        // Corrected property name to status
        console.log("failed2");
        setError(data.message);
      } else {
        console.log("failed");
        message.error("Registration failed");
      }
    } catch (error) {
      console.log("Authentication Failed");
      message.error(error && error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
