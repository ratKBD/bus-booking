import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BookSeat from "./BookSeat";
import SelectBus from "./SelectBus";

const Booking = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/");
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
        <button
          type="button"
          className="btn btn-danger"
          onClick={logoutHandler}
        >
          logout
        </button>
      </div>

      <BookSeat />
    </>
  );
};

export default Booking;
