import React, { useState } from "react";
import "./busUi.css";

const BusUi = ({ data }) => {
  const [selectSeat, setSelectSeat] = useState([
    {
      index: null,
      selected: false,
    },
  ]);
  // const seatSelectionHandler = (index) => {
  //   console.log(index);
  //   let toggle = selectSeat.filter((seat) => seat.index === index);
  //   console.log(">>>toggle", toggle);
  //   setSelectSeat((prev) => [
  //     ...prev,
  //     {
  //       index: index,
  //       selected: toggle[0]?.selected ? !toggle[0]?.selected : true,
  //     },
  //   ]);
  // };
  const seatSelectionHandler = (index) => {
    console.log(index);

    setSelectSeat((prev) => {
      // Find the index of the seat in the array
      const seatIndex = prev.findIndex((seat) => seat.index === index);

      if (seatIndex !== -1) {
        // Seat exists, create a new array and toggle the selected status of the seat
        const updatedSeats = [...prev];
        updatedSeats[seatIndex] = {
          ...updatedSeats[seatIndex],
          selected: !updatedSeats[seatIndex].selected,
        };
        return updatedSeats;
      } else {
        // Seat does not exist, add it to the array
        return [
          ...prev,
          {
            index: index,
            selected: true,
          },
        ];
      }
    });
  };

  console.log("data-->", selectSeat);
  return (
    <div
      className="container mt-5"
      style={{
        border: "2px solid red",
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "1025px",
      }}
    >
      {data?.map((d, index) => {
        const isSelected = selectSeat.some((seat) => {
          if (seat.index === index) return seat.selected;
        });
        console.log("arrr-->", isSelected);
        return (
          <div
            key={index}
            className={`seat m-2 d-flex justify-content-center align-items-center ${
              d.booked && d.gender ? `notavailable${d.gender}` : "available"
            } ${isSelected ? "seatSelected" : ""}`}
            onClick={() => !d.booked && seatSelectionHandler(index)}
          >
            {d.seat}
          </div>
        );
      })}
    </div>
  );
};

export default BusUi;
