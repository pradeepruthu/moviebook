import React, { createContext, useContext } from "react";
import useBooking from "./useBooking";
const BookingContext = createContext();
export function BookingProvider({ children }) {
  const bookingData = useBooking();
  return (
    <BookingContext.Provider value={bookingData}>
      {children}
    </BookingContext.Provider>
  );
}
export function useBookingContext() {
  return useContext(BookingContext);
}