const ItineraryCard = ({ itinerary }) => {
  if (!itinerary) return null;
  return (
    <div className="itinerary">
      {itinerary.map((day) => (
        <div key={day.day} className="itinerary-item">
          <div className="itinerary-day">
            <span className="badge">Day {day.day}</span>
          </div>
          <div className="itinerary-rows">
            <div className="itinerary-row">
              <span className="itinerary-label">Morning</span>
              <span className="itinerary-value">{day.morning}</span>
            </div>
            <div className="itinerary-row">
              <span className="itinerary-label">Afternoon</span>
              <span className="itinerary-value">{day.afternoon}</span>
            </div>
            <div className="itinerary-row">
              <span className="itinerary-label">Evening</span>
              <span className="itinerary-value">{day.evening}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryCard;
