
import React from "react";

function TheatreList({
  theatres = [],
  selectedTheatre,
  onSelect,
}) {
  function handleSelect(theatre) {
    onSelect(theatre);
  }

  if (theatres.length === 0) {
    return <p>No theatres available.</p>;
  }

  return (
    <div className="theatre-grid">
      {theatres.map((theatre) => (
        <div
          className={`theatre-card ${
            selectedTheatre?.id === theatre.id
              ? "selected-theatre"
              : ""
          }`}
          key={theatre.id}
        >
          <h3>{theatre.name}</h3>

          <p>Location: {theatre.location}</p>

          <button
            type="button"
            onClick={() => handleSelect(theatre)}
          >
            {selectedTheatre?.id === theatre.id
              ? "Selected Theatre"
              : "Select Theatre"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TheatreList;
