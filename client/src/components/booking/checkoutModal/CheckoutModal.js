import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useAllBusData } from "../../../contexts/BusContext";
import { useState } from "react";

export const CheckoutModal = (props) => {
  const navigate = useNavigate();
  const { updateBusData } = useAllBusData();
  const [loader, setLoader] = useState(false);
  function totalPrice() {
    let temp = 0;
    for (let i = 1; i < props.selectedSeat.length; i++) {
      console.log("temp", props.selectedSeat[i].price);
      temp = temp + props.selectedSeat[i].price;
    }
    return temp;
  }

  // const ticketHandler = () => {
  //   // Create an array to store all the fetch promises
  //   const fetchPromises = [];

  //   props.selectedSeat.forEach((data) => {
  //     if (data.id?.length > 0) {
  //       setLoader(true);
  //       // Create a fetch promise for each selected seat
  //       const fetchPromise = fetch(
  //         `http://localhost:8000/api/updateBusInfo/${data.id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             seatNo: data.seatNo,
  //             gender: data.gender === "men" ? "male" : "female",
  //             price: data.price,
  //             booked: true,
  //           }),
  //         }
  //       )
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error("Network response was not ok");
  //           }

  //           return response.json();
  //         })
  //         .then((data) => {
  //           console.log("Update successful:", data);
  //           // Optionally, you can update state here or trigger any other action
  //         })
  //         .catch((error) => {
  //           console.error("Error updating data:", error);
  //         });

  //       fetchPromises.push(fetchPromise);
  //     }
  //   });

  //   // Wait for all fetch promises to resolve
  //   Promise.all(fetchPromises)
  //     .then(() => {
  //       fetch("http://localhost:8000/api/busInfo")
  //         .then((data) => {
  //           setLoader(false);
  //           updateBusData(data.data.buses);
  //           console.log("before");
  //           swal({
  //             title: `Your Tickets were Confirmed`,
  //             icon: "success",
  //             buttons: false,
  //             timer: 2500,
  //           });
  //           console.log("after");
  //           navigate("/booking");
  //           // return response.json();
  //         })

  //         .catch((error) => {
  //           setLoader(false);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("One or more fetch requests failed:", error);
  //     });
  // };

  // Inside ticketHandler function
  const ticketHandler = () => {
    console.log("Ticket handler started");
    const fetchPromises = [];

    props.selectedSeat.forEach((data) => {
      console.log("Processing seat:", data);
      if (data.id?.length > 0) {
        console.log("Seat has valid ID:", data.id);
        setLoader(true);
        const fetchPromise = fetch(
          `http://localhost:8001/api/updateBusInfo/${data.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              seatNo: data.seatNo,
              gender: data.gender === "men" ? "male" : "female",
              price: data.price,
              booked: true,
            }),
          }
        )
          .then((response) => {
            console.log("Response received:", response);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // setLoader()
            console.log("Update successful:", data);
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });

        fetchPromises.push(fetchPromise);
      }
    });

    console.log("All fetch promises created:", fetchPromises);

    Promise.all(fetchPromises)
      .then(() => {
        fetch("http://localhost:8001/api/busInfo")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setLoader(false);
            console.log("booking success");
            updateBusData(data.data.buses);
            setLoader(false);
            swal({
              title: `Your Tickets were Confirmed`,
              icon: "success",
              buttons: false,
              timer: 2500,
            });
            navigate("/booking");
          })
          .catch((error) => {
            console.log(error);
          });

        // Further code
      })
      .catch((error) => {
        console.error("One or more fetch requests failed:", error);
      });
  };

  console.log("price", props.selectedSeat);
  return (
    <>
      {loader && (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
          {
            <div className="row">
              {props.selectedSeat.map((seat) => (
                <>
                  {seat.seatNo > 0 && (
                    <div key={seat._id} className="col-md-3 mb-3">
                      <div className="card ">
                        <div className="card-body ">
                          <h5 className="card-title d-flex justify-content-center">
                            Seat {seat.seatNo}
                          </h5>
                          <ul className="list-group list-group-flush ">
                            <li className="list-group-item">
                              Gender: {seat.gender}
                            </li>
                            <li className="list-group-item">
                              Price: ${seat.price}
                            </li>
                            {/* <li className="list-group-item">
                        Status: {seat.booked ? "Booked" : "Available"}
                      </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
              <div className="d-flex justify-content-center">
                <span style={{ color: "", fontWeight: "800" }}>Total:</span>
                <span
                  style={{ color: "red", fontWeight: "700" }}
                  className="mx-2"
                >
                  ${totalPrice()}
                </span>
              </div>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Book</Button> */}
          <Button onClick={ticketHandler}>Book</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
