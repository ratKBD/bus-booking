import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllBusData } from "../../contexts/BusContext";
import { useAuth } from "../../contexts/AuthContext";

const SelectBus = () => {
  const { busData, error } = useAllBusData();
  const { logout, userData } = useAuth();
  const navigate = useNavigate();

  const selectSeatHandler = (bus) => {
    navigate(`/booking/${bus}`);
  };
  const logoutHandler = () => {
    logout();
    navigate("/");
  };
  console.log("user-->", userData);
  return (
    <div className="container my-4">
      <div className="container my-4">
        <div className="d-flex justify-content-between  m-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <div>
            Welcome{" "}
            <span style={{ fontWeight: "700" }}>
              {userData?.email.split(".")[0]}
            </span>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={logoutHandler}
          >
            logout
          </button>
        </div>
        {busData?.map((bus) => {
          const totalSeats = bus.seats.length;
          const availableSeats = bus.seats.filter(
            (seat) => !seat.booked
          ).length;

          return (
            <>
              <div key={bus._id} className="card mb-4">
                <div className="card-header">
                  <h4>{bus.name}</h4>
                </div>
                <div className="card-body">
                  <p>Total Seats: {totalSeats}</p>
                  <p>Available Seats: {availableSeats}</p>
                  {/* <div className="row">
                  {bus.seats.map((seat) => (
                    <div key={seat._id} className="col-md-3 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Seat {seat.seatNo}</h5>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              Gender: {seat.gender}
                            </li>
                            <li className="list-group-item">
                              Price: ${seat.price}
                            </li>
                            <li className="list-group-item">
                              Status: {seat.booked ? "Booked" : "Available"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
                </div>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => selectSeatHandler(bus._id)}
                >
                  View Seats
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SelectBus;
