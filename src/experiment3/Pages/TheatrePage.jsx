import React from "react";
import { useNavigate } from "react-router-dom";
import TheatreList from "../../experiment1/components/TheatreList";
import ShowTiming from "../../experiment1/components/ShowTiming";
import { useBookingContext } from "../../experiment2/BookingContext";
function TheatrePage() {
  const navigate = useNavigate();
  const {
    selectedMovie,
    selectedTheatre,
    selectedShow,
    selectTheatre,
    selectShow,
  } = useBookingContext();
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
      <TheatreList
        selectedTheatre={selectedTheatre}
        onSelect={handleTheatreSelect}
      />
      <ShowTiming
        selectedShow={selectedShow}
        onSelect={handleShowSelect}
      />
      <button onClick={continueToSeats}>Continue to Seats</button>
    </section>
  );
}
export default TheatrePage;