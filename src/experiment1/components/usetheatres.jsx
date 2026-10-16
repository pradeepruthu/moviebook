import { useState, useEffect } from "react";

const fallbackTheatres = [
  { id: 1, name: "PVR Cinemas", location: "Trichy" },
  { id: 2, name: "INOX Cinemas", location: "Chennai" },
  { id: 3, name: "Kannan Theatre", location: "Madurai" },
];

function useTheatres() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTheatres() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/theatres");

        if (!response.ok) {
          throw new Error("Theatre API request failed");
        }

        const data = await response.json();
        setTheatres(data);
      } catch (err) {
        console.error("Theatre API Error:", err);
        setError("Theatre API is unavailable. Showing sample theatres.");
        setTheatres(fallbackTheatres);
      } finally {
        setLoading(false);
      }
    }

    fetchTheatres();
  }, []);

  return { theatres, loading, error };
}

export default useTheatres;