// Routers.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./../Pages/Home";
import Tours from "./../Pages/Tours";
import ToursDetails from "./../Pages/TourDetails";
import Login from "./../Pages/Login";
import Register from "./../Pages/Register";
import ThankYou from "./../Pages/ThankYou";
import SearchResultList from "./../Pages/SearchResultList";
import About from "../components/About/About";
import TravelMap from "../components/Map/TravelMap";
import FlightBooking from "../components/FlightBooking/FlightBooking";
import BookFlight from "../components/FlightBooking/BookFlight";
import FloatingChatbot from "../components/Chatbot/FloatingChatbot";


const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<ToursDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/tours/search" element={<SearchResultList />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<TravelMap />} />
        <Route path="/flights" element={<FlightBooking />} />
        <Route path="/book-flight" element={<BookFlight />} />
        

      </Routes>

      <FloatingChatbot/>

    </>
  );
};

export default Routers;
