import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";
import { TripContext } from "../context/TripContext";

const Home = () => {
  const { tripHistory, setTrip, clearHistory, removeTrip } =
    useContext(TripContext);
  const navigate = useNavigate();

  const handleOpenTrip = (trip) => {
    setTrip(trip);
    navigate("/trip");
  };

  return (
    <section className="page">
      <div className="hero">
        <div className="hero-copy">
          <h1>Design your next trip with AI</h1>
          <p>
            Turn a destination and a few dates into a clean, structured
            itinerary with weather, maps, and a smart packing list. No more
            messy notes or endless tabs.
          </p>
        </div>
        <div className="hero-side-card">
          <p className="hero-highlight">
            Plan a weekend escape, a business trip, or a long adventure in
            minutes.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Start a new trip</h2>
        <p className="section-subtitle">
          Tell us where you are going and how long you will stay.
        </p>
        <TripForm />
      </div>

      {tripHistory?.length > 0 && (
        <div className="card card-static">
          <div className="card-header">
            <div>
              <h2>Recent trips</h2>
              <p className="section-subtitle">
                Jump back into a previous itinerary in one click.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-compact"
              onClick={clearHistory}
            >
              Clear history
            </button>
          </div>

          <div className="trip-history">
            {tripHistory.map((trip) => {
              const tripDays = trip?.itinerary?.length || "-";
              const createdAt = trip?.createdAt
                ? new Date(trip.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Saved trip";

              return (
                <div
                  key={trip._id || `${trip.location}-${createdAt}`}
                  className="trip-history-card"
                >
                  <button
                    type="button"
                    className="trip-history-main"
                    onClick={() => handleOpenTrip(trip)}
                  >
                    <div>
                      <p className="trip-history-title">{trip.location}</p>
                      <p className="trip-history-meta">
                        {tripDays} day{tripDays > 1 ? "s" : ""} planned · {createdAt}
                      </p>
                    </div>
                    <span className="trip-history-cta">Open</span>
                  </button>
                  <button
                    type="button"
                    className="trip-history-remove"
                    onClick={() => removeTrip(trip._id)}
                    aria-label={`Remove ${trip.location} trip`}
                    title="Remove trip"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
