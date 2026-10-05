import React from "react";

function BookingSummary({ booking, onContinue }) {
  if (!booking) {
    return <p>Booking details not available.</p>;
  }

  return (
    <div className="booking-summary">
      <h3>Booking Details</h3>

      <p>
        <strong>Movie:</strong>{" "}
        {booking.movie?.title || "Not selected"}
      </p>

      <p>
        <strong>Theatre:</strong>{" "}
        {booking.theatre?.name || "Not selected"}
      </p>

      <p>
        <strong>Show:</strong>{" "}
        {booking.show?.time || "Not selected"}
      </p>

      <p>
        <strong>Seats:</strong>{" "}
        {booking.seats?.length > 0
          ? booking.seats.join(", ")
          : "No seats selected"}
      </p>

      <p>
        <strong>Total:</strong> ₹{booking.total || 0}
      </p>

      <button onClick={onContinue}>
        Continue to Payment
      </button>
    </div>
  );
}
export default BookingSummary;