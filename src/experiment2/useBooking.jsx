
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
    try {
      const savedSeats = localStorage.getItem("bookedSeats");
      return savedSeats ? JSON.parse(savedSeats) : {};
    } catch {
      return {};
    }
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

      if (!showKey || bookedSeats[showKey]?.includes(seat)) {
        return;
      }

      setSelectedSeats((previousSeats) =>
        previousSeats.includes(seat)
          ? previousSeats.filter((item) => item !== seat)
          : [...previousSeats, seat]
      );
    },
    [getShowKey, bookedSeats]
  );

  // Calculate total using the selected show price.
  const total = useMemo(() => {
    const price = Number(selectedShow?.price);

    if (
      !selectedShow ||
      selectedSeats.length === 0 ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return 0;
    }

    return selectedSeats.length * price;
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

      if (showKey && selectedSeats.length > 0) {
        setBookedSeats((previousBookedSeats) => {
          const existingSeats = previousBookedSeats[showKey] || [];

          const newBookedSeats = {
            ...previousBookedSeats,
            [showKey]: [
              ...new Set([...existingSeats, ...selectedSeats]),
            ],
          };

          localStorage.setItem(
            "bookedSeats",
            JSON.stringify(newBookedSeats)
          );

          return newBookedSeats;
        });
      }
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
