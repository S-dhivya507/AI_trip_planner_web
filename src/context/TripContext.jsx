import { createContext, useMemo, useState } from "react";

export const TripContext = createContext();

const getStoredTrip = () => {
  const raw = localStorage.getItem("trip");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const getStoredHistory = () => {
  const raw = localStorage.getItem("tripHistory");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const TripContextProvider = ({ children }) => {
  const [trip, setTripState] = useState(getStoredTrip);
  const [tripHistory, setTripHistory] = useState(getStoredHistory);

  const setTrip = (nextTrip) => {
    setTripState(nextTrip);
    if (nextTrip) {
      localStorage.setItem("trip", JSON.stringify(nextTrip));
    } else {
      localStorage.removeItem("trip");
    }
  };

  const addTrip = (nextTrip) => {
    const enrichedTrip = {
      ...nextTrip,
      _id: nextTrip?._id || String(Date.now()),
      createdAt: nextTrip?.createdAt || new Date().toISOString(),
    };

    setTrip(enrichedTrip);
    setTripHistory((prev) => {
      const next = [
        enrichedTrip,
        ...prev.filter((item) => item?._id !== enrichedTrip._id),
      ].slice(0, 6);
      localStorage.setItem("tripHistory", JSON.stringify(next));
      return next;
    });
  };

  const clearHistory = () => {
    setTripHistory([]);
    localStorage.removeItem("tripHistory");
  };

  const removeTrip = (id) => {
    if (!id) return;
    setTripHistory((prev) => {
      const next = prev.filter((item) => item?._id !== id);
      localStorage.setItem("tripHistory", JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(
    () => ({
      trip,
      setTrip,
      addTrip,
      tripHistory,
      clearHistory,
      removeTrip,
    }),
    [trip, tripHistory]
  );

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};
