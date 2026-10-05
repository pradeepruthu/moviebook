import React from "react";
import { useNavigate } from "react-router-dom";

import { useBookingContext } from "../../experiment2/BookingContext";

function BookedPage() {
  const navigate = useNavigate();
  const { confirmedBooking } = useBookingContext();

  if (!confirmedBooking) {
    return (
      <section className="page-section">
        <h2>No booked tickets found</h2>

        <button onClick={() => navigate("/movies")}>
          Book a Movie
        </button>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="success-box">
        <h2>!Booking Confirmed!</h2>

        <p>
          <strong>Movie:</strong>{" "}
          {confirmedBooking.movie?.title}
        </p>

        <p>
          <strong>Theatre:</strong>{" "}
          {confirmedBooking.theatre?.name}
        </p>

        <p>
          <strong>Show:</strong>{" "}
          {confirmedBooking.show?.time}
        </p>

        <p>
          <strong>Seats:</strong>{" "}
          {confirmedBooking.seats.join(", ")}
        </p>

        <p>
          <strong>Name:</strong>{" "}
          {confirmedBooking.customer.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {confirmedBooking.customer.email}
        </p>

        <p>
          <strong>Payment:</strong>{" "}
          {confirmedBooking.paymentMethod}
        </p>

        <h3>Total: ₹{confirmedBooking.total}</h3>

        <button onClick={() => navigate("/movies")}>
          Book Another Movie
        </button>
      </div>
    </section>
  );
}

export default BookedPage;