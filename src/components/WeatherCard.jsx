const WeatherCard = ({ weather }) => {
  if (!weather) return null;
  return (
    <div className="weather">
      <div className="stat">
        <span className="stat-label">Temperature</span>
        <span className="stat-value">{weather.temp}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Condition</span>
        <span className="stat-value">{weather.condition}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
