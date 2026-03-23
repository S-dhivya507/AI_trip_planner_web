import { useContext } from "react";
import { TripContext } from "../context/TripContext";
import ItineraryCard from "../components/ItineraryCard";
import WeatherCard from "../components/WeatherCard";
import MapView from "../components/MapView";
import PackingList from "../components/PackingList";
import PdfExport from "../components/PdfExport";

const Trip = () => {
  const { trip } = useContext(TripContext);

  if (!trip) {
    return (
      <section className="page">
        <div className="card">
          <h1>No trip yet</h1>
          <p>
            Start by creating a trip on the home page. Once generated, your
            itinerary, weather, map, and packing list will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="page trip-layout">
      <header className="trip-header card card-static">
        <div>
          <p className="eyebrow">Trip overview</p>
          <h1>{trip.location}</h1>
          <p className="section-subtitle">
            A structured overview of your upcoming journey.
          </p>
        </div>
        <div className="trip-actions">
          <div className="trip-meta">
            {trip.itinerary?.length && (
              <span className="meta-chip">
                {trip.itinerary.length} day{trip.itinerary.length > 1 ? "s" : ""} planned
              </span>
            )}
            <span className="meta-chip meta-chip--soft">AI-generated itinerary</span>
          </div>
          <PdfExport tripData={trip} />
        </div>
      </header>

      <div className="trip-grid">
        <div className="trip-main">
          <div className="card card-static">
            <h2>Daily itinerary</h2>
            <ItineraryCard itinerary={trip.itinerary} />
          </div>
        </div>

        <aside className="trip-side">
          <div className="card card-static">
            <h2>Weather snapshot</h2>
            <WeatherCard weather={trip.weather} />
          </div>
          <div className="card card-static">
            <h2>Map overview</h2>
            <MapView location={trip.location} />
          </div>
          <div className="card card-static">
            <h2>Packing checklist</h2>
            <PackingList items={trip.packingList} />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Trip;
