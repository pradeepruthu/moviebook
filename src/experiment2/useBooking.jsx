import { useState, useMemo, useCallback } from "react";

function useBooking() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [bookedSeats, setBookedSeats] = useState(() => {
    const savedSeats = localStorage.getItem("bookedSeats");

    return savedSeats ? JSON.parse(savedSeats) : {};
  });

  const selectMovie = useCallback((movie) => {
    setSelectedMovie(movie);
    setSelectedSeats([]);
  }, []);

  const selectTheatre = useCallback((theatre) => {
    setSelectedTheatre(theatre);
    setSelectedSeats([]);
  }, []);

  const selectShow = useCallback((show) => {
    setSelectedShow(show);
    setSelectedSeats([]);
  }, []);
  const getShowKey = useCallback(() => {
    if (!selectedMovie || !selectedTheatre || !selectedShow) {
      return null;
    }

    return `${selectedMovie.id}-${selectedTheatre.id}-${selectedShow.id}`;
  }, [selectedMovie, selectedTheatre, selectedShow]);
  const toggleSeat = useCallback(
    (seat) => {
      const showKey = getShowKey();

      if (!showKey) {
        return;
      }
      if (bookedSeats[showKey]?.includes(seat)) {
        return;
      }

      setSelectedSeats((previousSeats) => {
        if (previousSeats.includes(seat)) {
          return previousSeats.filter((item) => item !== seat);
        }

        return [...previousSeats, seat];
      });
    },
    [getShowKey, bookedSeats]
  );

  const total = useMemo(() => {
    if (!selectedShow) {
      return 0;
    }

    return selectedSeats.length * selectedShow.price;
  }, [selectedSeats, selectedShow]);
  const confirmBooking = useCallback(
    (paymentMethod) => {
      const showKey = getShowKey();

      const bookingDetails = {
        movie: selectedMovie,
        theatre: selectedTheatre,
        show: selectedShow,
        seats: selectedSeats,
        customer,
        paymentMethod,
        total,
        bookingDate: new Date().toLocaleString(),
      };

      setConfirmedBooking(bookingDetails);
      setBookedSeats((previousBookedSeats) => {
        const existingSeats = previousBookedSeats[showKey] || [];

        const updatedSeats = [
          ...new Set([...existingSeats, ...selectedSeats]),
        ];

        const newBookedSeats = {
          ...previousBookedSeats,
          [showKey]: updatedSeats,
        };
        localStorage.setItem(
          "bookedSeats",
          JSON.stringify(newBookedSeats)
        );

        return newBookedSeats;
      });
    },
    [
      getShowKey,
      selectedMovie,
      selectedTheatre,
      selectedShow,
      selectedSeats,
      customer,
      total,
    ]
  );

  return {
    selectedMovie,
    selectedTheatre,
    selectedShow,
    selectedSeats,
    bookedSeats,
    customer,
    confirmedBooking,
    total,
    selectMovie,
    selectTheatre,
    selectShow,
    toggleSeat,
    setCustomer,
    confirmBooking,
  };
}

export default useBooking;