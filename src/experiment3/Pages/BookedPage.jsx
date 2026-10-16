
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useBookingContext } from "../../experiment2/BookingContext";

function BookedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmedBooking } = useBookingContext();

  const [booking, setBooking] = useState(
    location.state?.apiBooking || confirmedBooking || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Use the booking returned by POST first.
    if (location.state?.apiBooking) {
      setBooking(location.state.apiBooking);
      return;
    }

    // Fall back to the existing booking context.
    if (confirmedBooking) {
      setBooking(confirmedBooking);
    }
  }, [location.state, confirmedBooking]);

  useEffect(() => {
    // If neither source has booking data, show the message below.
    if (booking) return;

    setLoading(false);
  }, [booking]);

  if (loading) {
    return (
      <section className="page-section">
        <p>Loading booking details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section">
        <p role="alert">{error}</p>
        <button onClick={() => navigate("/movies")}>
          Go to Movies
        </button>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="page-section">
        <h2>No booked tickets found</h2>
        <button onClick={() => navigate("/movies")}>
          Book a Movie
        </button>
      </section>
    );
  }

  const movie = booking.movie;
  const theatre = booking.theatre;
  const show = booking.show;
  const customer = booking.customer || {};

  const movieTitle =
    typeof movie === "string" ? movie : movie?.title || movie?.name || "N/A";

  const theatreName =
    typeof theatre === "string"
      ? theatre
      : theatre?.name || theatre?.title || "N/A";

  const showTime =
    typeof show === "string" ? show : show?.time || show?.timing || "N/A";

  const seats = Array.isArray(booking.seats)
    ? booking.seats.join(", ")
    : "N/A";

  return (
    <section className="page-section">
      <div className="success-box">
        <h2>!Booking Confirmed!</h2>

        <p>
          <strong>Booking ID:</strong> {booking.id || "N/A"}
        </p>

        <p>
          <strong>Movie:</strong> {movieTitle}
        </p>

        <p>
          <strong>Theatre:</strong> {theatreName}
        </p>

        <p>
          <strong>Show:</strong> {showTime}
        </p>

        <p>
          <strong>Seats:</strong> {seats}
        </p>

        <p>
          <strong>Name:</strong> {customer.name || "N/A"}
        </p>

        <p>
          <strong>Email:</strong> {customer.email || "N/A"}
        </p>

        <p>
          <strong>Payment:</strong> {booking.paymentMethod || "N/A"}
        </p>

        <h3>Total: ₹{booking.total ?? "N/A"}</h3>

        <button onClick={() => navigate("/movies")}>
          Book Another Movie
        </button>
      </div>
    </section>
  );
}

export default BookedPage;
