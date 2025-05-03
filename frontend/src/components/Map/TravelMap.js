import React, { useState } from "react";

const TravelMap = () => {
  const [selectedLocation, setSelectedLocation] = useState("New York");

  const locations = [
    "New York",
    "Paris",
    "Mumbai",
    "Tokyo",
    "Sydney",
    "Cape Town"
  ];

  const apiKey = "AIzaSyC6iznXCD39tHCCR_a6aCjM_4UaQlKDjnQ"; // replace with your actual API key

  return (
    <div style={{ padding: "20px" }}>
      <h1>📍 Popular Travel Locations</h1>

      {/* Location list */}
      <ul>
        {locations.map((location, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
              fontSize: "18px"
            }}
            onClick={() => setSelectedLocation(location)} // Update selected location
          >
            {location}
          </li>
        ))}
      </ul>

      {/* Embedded Map */}
      <div style={{ marginTop: "30px" }}>
        <iframe
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
            selectedLocation
          )}`}
        />
      </div>
    </div>
  );
};

export default TravelMap;
