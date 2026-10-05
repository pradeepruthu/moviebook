import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BookingSummary from "../../experiment1/components/BookingSummary";
import { useBookingContext } from "../../experiment2/BookingContext";

function SummaryPage() {
  const navigate = useNavigate();

  const {
    selectedMovie,
    selectedTheatre,
    selectedShow,
    selectedSeats,
    customer,
    setCustomer,
    total,
  } = useBookingContext();

  const [name, setName] = useState(customer?.name || "");
  const [email, setEmail] = useState(customer?.email || "");

  function continueToPayment() {
    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email");
      return;
    }

    if (!selectedMovie || !selectedTheatre || !selectedShow) {
      alert("Please select movie, theatre and show first");
      navigate("/movies");
      return;
    }

    if (!selectedSeats || selectedSeats.length === 0) {
      alert("Please select at least one seat");
      navigate("/booking/seats");
      return;
    }

    setCustomer({
      name: name,
      email: email,
    });

    navigate("/booking/payment");
  }

  const booking = {
    movie: selectedMovie,
    theatre: selectedTheatre,
    show: selectedShow,
    seats: selectedSeats,
    total: total,
  };

  return (
    <section className="page-section">
      <h2>Booking Summary</h2>

      <BookingSummary
        booking={booking}
        onContinue={continueToPayment}
      />

      <div className="customer-form">
        <h3>Customer Details</h3>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button onClick={continueToPayment}>
          Continue to Payment
        </button>
      </div>
    </section>
  );
}

export default SummaryPage;