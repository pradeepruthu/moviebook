import React from "react";
import { useNavigate } from "react-router-dom";

import SeatSelection from "../../experiment1/components/SeatSelection";
import { useBookingContext } from "../../experiment2/BookingContext";

function SeatsPage() {
  const navigate = useNavigate();

  const {
    selectedMovie,
    selectedTheatre,
    selectedShow,
    selectedSeats,
    bookedSeats,
    toggleSeat,
  } = useBookingContext();

  function continueToSummary() {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    navigate("/booking/summary");
  }

  if (!selectedMovie || !selectedTheatre || !selectedShow) {
    return (
      <section className="page-section">
        <h2>Please select movie, theatre and show first</h2>

        <button onClick={() => navigate("/movies")}>
          Go to Movies
        </button>
      </section>
    );
  }

  const showKey = `${selectedMovie.id}-${selectedTheatre.id}-${selectedShow.id}`;

  return (
    <section className="page-section">
      <h2>Select Your Seats</h2>

      <SeatSelection
        selectedSeats={selectedSeats}
        bookedSeats={bookedSeats[showKey] || []}
        toggleSeat={toggleSeat}
      />

      <button onClick={continueToSummary}>
        Continue to Summary
      </button>
    </section>
  );
}

export default SeatsPage;