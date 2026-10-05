import React, { useState } from "react";

const theatres = [
  {
    id: 1,
    name: "PVR Cinemas",
    location: "Trichy",
  },
  {
    id: 2,
    name: "INOX Cinemas",
    location: "Chennai",
  },
  {
    id: 3,
    name: "Kannan Theatre",
    location: "Madurai",
  },
];

function TheatreList({ onSelect }) {
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  function handleSelect(theatre) {
    setSelectedTheatre(theatre.id);
    onSelect(theatre);
  }

  return (
    <div className="theatre-grid">
      {theatres.map((theatre) => (
        <div
          className={`theatre-card ${
            selectedTheatre === theatre.id ? "selected-theatre" : ""
          }`}
          key={theatre.id}
        >
          <h3>{theatre.name}</h3>

          <p>Location: {theatre.location}</p>

          <button onClick={() => handleSelect(theatre)}>
            {selectedTheatre === theatre.id
              ? "Selected Theatre"
              : "Select Theatre"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TheatreList;