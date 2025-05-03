import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const BookFlight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storedFlight = localStorage.getItem("selectedFlight");
  const flight = storedFlight ? JSON.parse(storedFlight) : null;

  if (!flight) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          No flight data provided.{" "}
          <Button color="link" onClick={() => navigate(-1)}>
            Go back
          </Button>
        </div>
      </div>
    );
  }

  const firstSegment = flight.flights?.[0];

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h1 className="mb-4">Confirm Your Flight</h1>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>Airline:</strong> {firstSegment?.airline}
          </li>
          <li className="list-group-item">
            <strong>Flight Number:</strong> {firstSegment?.flight_number}
          </li>
          <li className="list-group-item">
            <strong>From:</strong> {firstSegment?.departure_airport?.name}
          </li>
          <li className="list-group-item">
            <strong>To:</strong> {firstSegment?.arrival_airport?.name}
          </li>
          <li className="list-group-item">
            <strong>Class:</strong> {firstSegment?.travel_class}
          </li>
          <li className="list-group-item">
            <strong>Duration:</strong> {flight.total_duration} mins
          </li>
          <li className="list-group-item">
          <strong>Price:</strong> ₹
          {flight.price.toLocaleString("en-IN")}
          </li>
        </ul>
        <a
          href={flight.booking_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Continue to Booking
        </a>
      </div>
    </div>
  );
};

export default BookFlight;
