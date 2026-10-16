
import React from "react";
import { useNavigate } from "react-router-dom";
import TheatreList from "../../experiment1/components/TheatreList";
import ShowTiming from "../../experiment1/components/ShowTiming";
import { useBookingContext } from "../../experiment2/BookingContext";
import useTheatres from "../../experiment1/components/usetheatres";

function TheatrePage() {
  const navigate = useNavigate();

  const {
    selectedMovie,
    selectedTheatre,
    selectedShow,
    selectTheatre,
    selectShow,
  } = useBookingContext();

  const {
    theatres,
    loading,
    error,
  } = useTheatres();

  function handleTheatreSelect(theatre) {
    selectTheatre(theatre);
  }

  function handleShowSelect(show) {
    selectShow(show);
  }

  function continueToSeats() {
    if (!selectedTheatre || !selectedShow) {
      alert("Please select theatre and show timing");
      return;
    }

    navigate("/booking/seats");
  }

  return (
    <section className="page-section">
      <h2>Select Theatre and Show</h2>

      {selectedMovie && (
        <h3 className="selected-movie">
          Movie: {selectedMovie.title}
        </h3>
      )}

      {loading ? (
        <p>Loading theatres...</p>
      ) : (
        <>
          {error && (
            <p className="error-message">{error}</p>
          )}

          <TheatreList
            theatres={theatres}
            selectedTheatre={selectedTheatre}
            onSelect={handleTheatreSelect}
          />
        </>
      )}

      <ShowTiming
        selectedShow={selectedShow}
        onSelect={handleShowSelect}
      />

      <button
        onClick={continueToSeats}
        disabled={loading}
      >
        Continue to Seats
      </button>
    </section>
  );
}

export default TheatrePage;
