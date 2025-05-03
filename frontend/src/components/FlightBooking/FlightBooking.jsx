import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./FlightBooking.css";

const FlightBooking = () => {
  const [departure, setDeparture] = useState("DEL");
  const [arrival, setArrival] = useState("BOM");
  const [outboundDate, setOutboundDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [adults, setAdults] = useState(1);
  const [flightResults, setFlightResults] = useState([]);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearchFlights = async () => {
    try {
      const res = await axios.get("/api/flights", {
        params: {
          departure_id: departure,
          arrival_id: arrival,
          outbound_date: outboundDate,
          return_date: returnDate,
          adults,
        },
      });
      setFlightResults(res.data.best_flights || []);
      setError(null);
      setShowResults(true);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("Failed to fetch flight data.");
    }
  };

  const handleBack = () => {
    setShowResults(false);
    setFlightResults([]);
  };

  return (
    <div className="flight-booking-container py-4">
      {!showResults ? (
        <>
          <h1 className="booking-title mb-4">Flight Search</h1>
          <Form className="search-form mb-4">
            <Row className="gy-3">
              <Col md={4}>
                <FormGroup>
                  <Label for="departure">Departure</Label>
                  <Input
                    id="departure"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    placeholder="Departure"
                    className="form-input"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="arrival">Arrival</Label>
                  <Input
                    id="arrival"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    placeholder="Arrival"
                    className="form-input"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="adults">Adults</Label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="form-input"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="outboundDate">Depart</Label>
                  <Input
                    id="outboundDate"
                    type="date"
                    value={outboundDate}
                    onChange={(e) => setOutboundDate(e.target.value)}
                    className="form-input"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="returnDate">Return</Label>
                  <Input
                    id="returnDate"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="form-input"
                  />
                </FormGroup>
              </Col>
              <Col>
                <Button color="primary" className="search-btn" onClick={handleSearchFlights}>
                  Search Flights
                </Button>
              </Col>
            </Row>
          </Form>
          {error && <div className="error-message">{error}</div>}
        </>
      ) : (
        <>
          <div className="results-header d-flex justify-content-between align-items-center mb-4">
            <h2 className="results-title">Flight Results</h2>
            <Button color="secondary" className="back-btn" onClick={handleBack}>
              ← Back to Search
            </Button>
          </div>
          {flightResults.length === 0 ? (
            <p className="no-results">No flights found.</p>
          ) : (
            <Row>
              {flightResults.map((flight, index) => {
                const firstSegment = flight.flights?.[0];
                return (
                  <Col lg="4" md="6" sm="12" key={index} className="mb-4">
                    <div className="flight-card">
                      <h5 className="flight-number">Flight #{index + 1}</h5>
                      <div className="flight-info">
                        <p><strong>Airline:</strong> {firstSegment?.airline || "N/A"}</p>
                        <p><strong>Flight #:</strong> {firstSegment?.flight_number || "N/A"}</p>
                        <p><strong>From:</strong> {firstSegment?.departure_airport?.name || "N/A"}</p>
                        <p><strong>To:</strong> {firstSegment?.arrival_airport?.name || "N/A"}</p>
                        <p><strong>Class:</strong> {firstSegment?.travel_class || "N/A"}</p>
                        <p><strong>Duration:</strong> {flight.total_duration} mins</p>
                        <p><strong>Price:</strong> ₹{flight.price.toLocaleString("en-IN")}</p>
                      </div>
                      <Button
                        color="primary"
                        className="book-btn w-100 mt-3"
                        onClick={() => {
                          localStorage.setItem("selectedFlight", JSON.stringify(flight));
                          window.open("/book-flight", "_blank");
                        }}
                        target="_blank"
                      >
                        Book Now
                      </Button>
                    </div>
                  </Col>
                );
              })}
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default FlightBooking;
