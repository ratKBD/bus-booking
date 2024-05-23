import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const registeredUser = async (values) => {
    console.log("val-->", values);
    console.log(
      "test",
      values.password !== values.passwordConfirm,
      values.password,
      values.passwordConfirm
    );
    if (values.password !== values.passwordConfirm) {
      console.log("checkkkkk");
      return setError("Password are not the same");
    }
    try {
      setError(null);
      setLoading(false);
      const res = await fetch("http://localhost:8001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("data111-->", res);
      const data = await res.json();
      console.log("data-->", data);
      if (res.status === 201) {
        console.log("successs--");
        message.success(data.message);
        // login(data.token, data.user);
        navigate("/login");
      } else if (res.status === 400) {
        console.log("failed2");
        setError(data.message);
      } else {
        console.log("failed");
        message.error("Registration failed");
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registeredUser };
};

export default useSignUp;
