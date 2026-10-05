import React, { useState } from "react";

function Payment({ total, onPay }) {
  const [method, setMethod] = useState("Cash on Delivery");

  function handleSubmit(e) {
    e.preventDefault();
    onPay(method);
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Payment</h2>

      <p className="payment-total">
        Total Amount: ₹{total}
      </p>

      <label>Payment Method</label>

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option>Cash on Delivery</option>
        <option>UPI</option>
        <option>Card</option>
      </select>

      <button type="submit">Confirm Payment</button>
    </form>
  );
}

export default Payment;