import React, { useEffect, useState } from "react";
// import BusUi from "./busUi/BusUi";
import "./busUi/busUi.css";
import { useParams } from "react-router-dom";
import { useAllBusData } from "../../contexts/BusContext";
import { Button } from "react-bootstrap";
import { CheckoutModal } from "./checkoutModal/CheckoutModal";

const BookSeat = () => {
  const { busData, loading, error } = useAllBusData();
  const { id } = useParams();
  const [selectedBus, setSelectedBus] = useState();
  const [selectedGender, setSelectedGender] = useState("men");
  const [modalShow, setModalShow] = React.useState(false);
  const [selectSeat, setSelectSeat] = useState([
    {
      index: null,
      selected: false,
      price: null,
      seatNo: "",
      gender: "",
      id: null,
    },
  ]);
  console.log("location.pathname", id);
  //   const bus1 = [
  //     { seat: 1, gender: "male", booked: true },
  //     { seat: 2, gender: null, booked: false },
  //     { seat: 3, gender: null, booked: false },
  //     { seat: 4, gender: null, booked: false },
  //     { seat: 5, gender: "female", booked: true },
  //     { seat: 6, gender: null, booked: false },
  //     { seat: 7, gender: null, booked: false },
  //     { seat: 8, gender: null, booked: false },
  //     { seat: 9, gender: null, booked: false },
  //     { seat: 10, gender: null, booked: false },
  //     { seat: 11, gender: null, booked: false },
  //     { seat: 12, gender: null, booked: false },
  //     { seat: 13, gender: null, booked: false },
  //     { seat: 14, gender: null, booked: false },
  //     { seat: 15, gender: null, booked: false },
  //     { seat: 16, gender: null, booked: false },
  //     { seat: 17, gender: null, booked: false },
  //     { seat: 18, gender: null, booked: false },
  //     { seat: 19, gender: null, booked: false },
  //     { seat: 20, gender: null, booked: false },
  //     { seat: 21, gender: null, booked: false },
  //     { seat: 22, gender: null, booked: false },
  //     { seat: 23, gender: null, booked: false },
  //     { seat: 24, gender: null, booked: false },
  //     { seat: 25, gender: null, booked: false },
  //     { seat: 26, gender: null, booked: false },
  //     { seat: 27, gender: null, booked: false },
  //     { seat: 28, gender: null, booked: false },
  //     { seat: 29, gender: null, booked: false },
  //     { seat: 30, gender: null, booked: false },
  //   ];

  useEffect(() => {
    console.log("dataApi", busData, typeof id);
    if (busData?.length > 0)
      setSelectedBus(busData?.filter((data) => data._id === id));
  }, [busData, id]);

  // useEffect(() => {
  //   checkAvailable();
  // }, [selectSeat]);
  const checkAvailable = (data) => {
    console.log("hover-->", data);
    let current = data?.seatNo;

    let checkForLeft = current + busData[0]?.seats?.length / 2;
    let checkForRight = current - busData[0]?.seats?.length / 2;
    let check;
    let returnCheck;

    if (current <= busData[0]?.seats?.length / 2) {
      check = checkForLeft;
      check = busData[0]?.seats[check - 1];
      console.log("hoverData", data.gender);
      if (data.gender === "" && check.gender === "") {
        returnCheck = false;
      } else {
        returnCheck =
          check?.gender === "male" && selectedGender === "men"
            ? false
            : check?.gender === "female" && selectedGender === "women"
            ? false
            : true;
      }
    } else {
      check = checkForRight;
      check = busData[0]?.seats[check - 1];
      console.log("down-->");
      if (data.gender === "" && check.gender === "") {
        returnCheck = false;
      } else {
        returnCheck =
          check?.gender === "male" && selectedGender === "men"
            ? false
            : check?.gender === "female" && selectedGender === "women"
            ? false
            : true;
      }
    }
    console.log("returnCheck", returnCheck);
    return !returnCheck;
  };
  const seatSelectionHandler = (index, data) => {
    setSelectSeat((prev) => {
      const existingSeatIndex = prev.findIndex((seat) => seat.index === index);

      if (existingSeatIndex !== -1) {
        // Seat already selected, remove it
        const updatedSeats = [...prev];
        updatedSeats.splice(existingSeatIndex, 1);
        return updatedSeats;
      } else {
        // Seat not selected, add it
        return [
          ...prev,
          {
            index: index,
            selected: true,
            price: data.price,
            seatNo: data.seatNo,
            gender: selectedGender,
            id: id,
          },
        ];
      }
    });
  };

  // const seatSelectionHandler = (index, data) => {
  //   console.log("data_id", data);

  //   setSelectSeat((prev) => {
  //     // Find the index of the seat in the array
  //     const seatIndex = prev.findIndex((seat) => seat.index === index);

  //     if (seatIndex !== -1) {
  //       // Seat exists, create a new array and toggle the selected status of the seat
  //       const updatedSeats = [...prev];
  //       updatedSeats[seatIndex] = {
  //         ...updatedSeats[seatIndex],
  //         selected: !updatedSeats[seatIndex].selected,
  //         price: data.price,
  //         seatNo: data.seatNo,
  //         gender: selectedGender,
  //         id: id,
  //       };
  //       return updatedSeats;
  //     } else {
  //       // Seat does not exist, add it to the array
  //       return [
  //         ...prev,
  //         {
  //           index: index,
  //           selected: true,
  //           price: data.price,
  //           seatNo: data.seatNo,
  //           gender: selectedGender,
  //           id: id,
  //         },
  //       ];
  //     }
  //   });
  // };

  console.log("selectedBus", selectedBus);
  const handleValuChange = (e) => {
    setSelectedGender(e.target.value);
    setSelectSeat([
      {
        index: null,
        selected: false,
        price: null,
        seatNo: "",
        gender: "",
      },
    ]);
  };
  console.log("input-->", selectedGender);
  return (
    <div className="container  ">
      <div className="d-flex justify-content-center align-items-center busTitle">
        {selectedBus?.map((d) => d.name)}
      </div>
      <div className="pt-3">
        {" "}
        <span className="mx-2">Book For</span>
        <input
          className="me-2"
          type="radio"
          id="html"
          value="men"
          name="gender"
          onChange={(e) => {
            handleValuChange(e);
          }}
          selected
          defaultChecked
        />
        <label
          className="my-text14 fw-semibold label-color"
          style={{
            textAlign: "center",

            marginRight: "20px",
          }}
          for="men"
        >
          Men
        </label>
        <input
          className="me-2"
          type="radio"
          id="html"
          value="women"
          name="gender"
          onChange={(e) => {
            handleValuChange(e);
          }}
        />
        <label
          className="my-text14 fw-semibold label-color"
          style={{
            textAlign: "center",

            marginRight: "20px",
          }}
          for="women"
        >
          Women
        </label>
      </div>
      <div
        className="container mt-5"
        style={{
          border: "2px solid red",
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "1025px",
          borderRadius: "20px",
          backgroundColor: "#FF474C",
        }}
      >
        {selectedBus &&
          selectedBus[0]?.seats?.map((d, index) => {
            const isSelected = selectSeat.some((seat) => {
              if (seat.index === index) return seat.selected;
            });
            console.log("arrr-->", selectSeat);
            return (
              <>
                <div
                  key={index}
                  className={`seat m-2 d-flex justify-content-center align-items-center ${
                    d.booked && d.gender
                      ? `notavailable${d.gender}`
                      : "available"
                  } ${isSelected ? "seatSelected" : ""} ${
                    d.booked === true ? "not-allowed" : ""
                  } ${checkAvailable(d) ? "" : "not-allowed"}`}
                  onClick={() => {
                    if (checkAvailable(d)) {
                      !d.booked && seatSelectionHandler(index, d);
                    }
                  }}
                  disabled={checkAvailable(d)}
                  // disabled={d.booked === true ? true : false}
                  onMouseOver={() => {
                    console.log(
                      "hover----->",
                      checkAvailable(d),
                      selectedGender
                    );
                    return checkAvailable(d);
                  }}
                >
                  {d.seatNo}
                </div>
              </>
            );
          })}
      </div>
      <div className="d-flex justify-content-around legend-container mt-4  ">
        <div className="legend-item">
          <div className="legend-color legend-color-blue "></div>
          <span>Blue: Booked by Male</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color-pink "></div>
          <span>Pink: Booked by Female</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-color-green "></div>
          <span>Green: Selected Seat</span>
        </div>
        {/* Add more legend items as needed */}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          disabled={selectSeat?.length < 2 && true}
        >
          {"Proceed to Checkout"}
        </Button>
      </div>
      <CheckoutModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedSeat={selectSeat}
      />
    </div>
  );
};

export default BookSeat;
