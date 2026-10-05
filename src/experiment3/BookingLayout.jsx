import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function BookingLayout() {
  const location = useLocation();

  const steps = [
    { name: "Theatre", path: "/booking/theatre" },
    { name: "Seats", path: "/booking/seats" },
    { name: "Summary", path: "/booking/summary" },
    { name: "Payment", path: "/booking/payment" },
  ];

  return (
    <div className="booking-layout">
      <div className="booking-steps">
        {steps.map((step, index) => {
          const active = location.pathname === step.path;

          return (
            <div
              className={`booking-step ${active ? "active-step" : ""}`}
              key={step.path}
            >
              <span>{index + 1}</span>
              <p>{step.name}</p>
            </div>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
}

export default BookingLayout;