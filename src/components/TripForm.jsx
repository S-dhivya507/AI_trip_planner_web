// src/components/TripForm.jsx
import { useState, useContext } from "react";
import Spinner from "./Spinner";
import { generateTripPlan } from "../services/aiService";
import { fetchWeather } from "../services/weatherService";
import { TripContext } from "../context/TripContext";
import { useNavigate } from "react-router-dom";

const TripForm = () => {
  const { addTrip } = useContext(TripContext);
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("3");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedDestination = destination.trim();
    const dayCount = Number(days);

    if (!trimmedDestination || trimmedDestination.length < 2) {
      setError("Please enter a valid destination.");
      return;
    }

    if (!Number.isInteger(dayCount) || dayCount < 1 || dayCount > 30) {
      setError("Days must be a whole number between 1 and 30.");
      return;
    }

    setLoading(true);

    try {
      const data = await generateTripPlan(trimmedDestination, dayCount);
      const weather = await fetchWeather(trimmedDestination);
      data.weather = weather;

      addTrip(data);
      navigate("/trip");
    } catch (err) {
      console.error(err);
      setError("Failed to generate trip. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <div className="form-grid">
        <label className="field">
          <span className="field-label">Destination</span>
          <input
            placeholder="e.g. Paris, Tokyo, Dubai"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            autoComplete="off"
          />
        </label>

        <label className="field field--sm">
          <span className="field-label">Days</span>
          <input
            type="number"
            value={days}
            min="1"
            max="30"
            onChange={(e) => setDays(e.target.value)}
          />
        </label>

        <div className="field field--actions">
          <span className="field-label sr-only">Actions</span>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate trip"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-panel" aria-live="polite">
          <div className="loading-row">
            <Spinner />
            <div>
              <p className="loading-title">Generating your trip plan</p>
              <p className="loading-subtitle">
                Creating itinerary, weather snapshot, map, and packing list...
              </p>
            </div>
          </div>

          <div className="skeleton-grid">
            <div className="skeleton skeleton-card" />
            <div className="skeleton skeleton-card" />
            <div className="skeleton skeleton-card" />
          </div>
        </div>
      )}
      {error && <p className="form-error">{error}</p>}
    </form>
  );
};

export default TripForm;

