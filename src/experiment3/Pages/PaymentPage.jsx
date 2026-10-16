
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Payment from "../../experiment1/components/Payment";
import { useBookingContext } from "../../experiment2/BookingContext";

function PaymentPage() {
  const navigate = useNavigate();

  const {
    selectedMovie,
    selectedTheatre,
    selectedShow,
    selectedSeats,
    customer,
    total,
    confirmBooking,
  } = useBookingContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Find the selected show price, if it is available.
  const showPrice =
    typeof selectedShow === "object"
      ? Number(selectedShow?.price)
      : 0;

  // Prefer the existing context total. Otherwise calculate
  // using the selected show price and number of seats.
  const calculatedTotal =
    Number(total) > 0
      ? Number(total)
      : showPrice * (selectedSeats?.length || 0);

  async function handlePayment(paymentMethod) {
    if (loading) return;

    if (!customer?.name || !customer?.email) {
      setError(
        "Customer details missing. Please return to booking summary."
      );
      return;
    }

    if (
      !selectedMovie ||
      !selectedTheatre ||
      !selectedShow ||
      !selectedSeats?.length
    ) {
      setError(
        "Booking details missing. Please select movie, theatre, show and seats."
      );
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (!Number.isFinite(calculatedTotal) || calculatedTotal <= 0) {
      setError(
        "Ticket total is missing. Please check the show price in BookingContext."
      );
      return;
    }

    setLoading(true);
    setError("");

    const bookingData = {
      customer: {
        name: customer.name,
        email: customer.email,
      },
      movie: selectedMovie,
      theatre: selectedTheatre,
      show: selectedShow,
      seats: selectedSeats,
      total: calculatedTotal,
      paymentMethod,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to save booking"
        );
      }

      // Pass the payment details to the confirmation page.
      const savedBooking = {
        ...result,
        customer: bookingData.customer,
        total: result.total ?? calculatedTotal,
        paymentMethod:
          result.paymentMethod ?? paymentMethod,
      };

      confirmBooking(paymentMethod);

      navigate("/booked", {
        state: { apiBooking: savedBooking },
      });
    } catch (err) {
      console.error("Booking API Error:", err);
      setError(
        err.message || "Unable to save booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-section">
      <h2>Payment</h2>

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {loading && <p>Saving booking...</p>}

      <Payment
        total={calculatedTotal}
        onPay={handlePayment}
      />
    </section>
  );
}

export default PaymentPage;
