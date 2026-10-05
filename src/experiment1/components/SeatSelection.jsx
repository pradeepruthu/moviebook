import React from "react";

const seats = Array.from(
  { length: 30 },
  (_, index) => `S${index + 1}`
);

function SeatSelection({ selectedSeats, toggleSeat }) {
  return (
    <div className="seat-grid">
      {seats.map((seat) => (
        <button
          key={seat}
          className={
            selectedSeats.includes(seat)
              ? "seat selected"
              : "seat"
          }
          onClick={() => toggleSeat(seat)}
        >
          {seat}
        </button>
      ))}
    </div>
  );
}

export default SeatSelection;