
import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../experiment1/components/Header";
import Footer from "../experiment1/components/Footer";

import HomePage from "./Pages/HomePage";
import MoviesPage from "./Pages/MoviesPage";
import MovieDetailsPage from "./Pages/MovieDetailsPage";
import TheatrePage from "./Pages/TheatrePage";
import SeatsPage from "./Pages/SeatsPage";
import SummaryPage from "./Pages/SummaryPage";
import PaymentPage from "./Pages/PaymentPage";
import BookedPage from "./Pages/BookedPage";
import BookingHistory from "./Pages/BookingHistory";

import Signup from "../experiment4/Signup";
import Login from "../experiment4/Login";
import BookingLayout from "./BookingLayout";
import ProtectedRoute from "../experiment4/ProtectedRoute";

function AppRoutes() {
  return (
    <>
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/booking" element={<BookingLayout />}>
              <Route path="theatre" element={<TheatrePage />} />
              <Route path="seats" element={<SeatsPage />} />
              <Route path="summary" element={<SummaryPage />} />
              <Route path="payment" element={<PaymentPage />} />
            </Route>

            <Route path="/booked" element={<BookedPage />} />
            <Route
              path="/booking-history"
              element={<BookingHistory />}
            />
          </Route>
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default AppRoutes;
