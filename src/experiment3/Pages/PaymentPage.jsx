import React from "react";
import { useNavigate } from "react-router-dom";

import Payment from "../../experiment1/components/Payment";

import { useBookingContext } from "../../experiment2/BookingContext";

function PaymentPage() {
  const navigate = useNavigate();

  const { total, confirmBooking } = useBookingContext();

  function handlePayment(paymentMethod) {
    confirmBooking(paymentMethod);

    alert("Booking confirmed successfully!");

    navigate("/booked");
  }

  return (
    <section className="page-section">
      <h2>Payment</h2>

      <Payment total={total} onPay={handlePayment} />
    </section>
  );
}

export default PaymentPage;