
import React, { useEffect, useState } from "react";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/bookings"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch booking history");
        }

        const data = await response.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Booking History API Error:", err);
        setError(
          err.message || "Unable to load booking history"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <section className="page-section">
        <h2>Booking History</h2>
        <p>Loading bookings...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section">
        <h2>Booking History</h2>
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <h2>Booking History</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-history-list">
          {bookings.map((booking) => {
            const movie =
              typeof booking.movie === "string"
                ? booking.movie
                : booking.movie?.title ||
                  booking.movie?.name ||
                  "N/A";

            const theatre =
              typeof booking.theatre === "string"
                ? booking.theatre
                : booking.theatre?.name || "N/A";

            const show =
              typeof booking.show === "string"
                ? booking.show
                : booking.show?.time || "N/A";

            // Customer can be a string or an object
            const customerName =
              typeof booking.customer === "string"
                ? booking.customer
                : booking.customer?.name ||
                  booking.customerName ||
                  "Not provided";

            // Read total only if it was saved by the backend
            const total =
              booking.total ??
              booking.amount ??
              booking.totalAmount ??
              null;

            return (
              <div className="success-box" key={booking.id}>
                <h3>Booking ID: {booking.id}</h3>

                <p>
                  <strong>Movie:</strong> {movie}
                </p>

                <p>
                  <strong>Theatre:</strong> {theatre}
                </p>

                <p>
                  <strong>Show:</strong> {show}
                </p>

                <p>
                  <strong>Seats:</strong>{" "}
                  {Array.isArray(booking.seats)
                    ? booking.seats.join(", ")
                    : "N/A"}
                </p>

                <p>
                  <strong>Customer:</strong> {customerName}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {booking.status || "Confirmed"}
                </p>

                <p>
                  <strong>Total:</strong>{" "}
                  {total !== null
                    ? `₹${total}`
                    : "Not available"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default BookingHistory;