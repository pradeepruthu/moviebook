import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../experiment1/components/Header";
import Footer from "../experiment1/components/Footer";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import TheatrePage from "./Pages/TheatrePage";
import SeatsPage from "./pages/SeatsPage";
import SummaryPage from "./pages/SummaryPage";
import PaymentPage from "./pages/PaymentPage";
import BookedPage from "./pages/BookedPage";
import Signup from "../experiment4/Signup";
import BookingLayout from "./BookingLayout";

import Login from "../experiment4/Login";
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
          </Route>
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default AppRoutes;