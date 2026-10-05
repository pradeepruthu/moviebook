import React, { useState } from "react";

const shows = [
  {
    id: 1,
    time: "10:00 AM",
    price: 150,
  },
  {
    id: 2,
    time: "02:00 PM",
    price: 180,
  },
  {
    id: 3,
    time: "06:30 PM",
    price: 220,
  },
  {
    id: 4,
    time: "09:30 PM",
    price: 200,
  },
];

function ShowTiming({ onSelect }) {
  const [selectedShow, setSelectedShow] = useState(null);

  function handleSelect(show) {
    setSelectedShow(show.id);
    onSelect(show);
  }

  return (
    <div className="show-grid">
      {shows.map((show) => (
        <button
          key={show.id}
          className={`show-btn ${
            selectedShow === show.id ? "selected-show" : ""
          }`}
          onClick={() => handleSelect(show)}
        >
          {show.time}
          <br />
          ₹{show.price}
        </button>
      ))}
    </div>
  );
}

export default ShowTiming;