// const MapView = ({ location }) => {
//   return (
//     <div className="card">
//       <h3>🗺 Map</h3>
//       <iframe
//         title="map"
//         width="100%"
//         height="300"
//         src={`https://maps.google.com/maps?q=${location}&output=embed`}
//       />
//     </div>
//   );
// };

// export default MapView;

const MapView = ({ location }) => {
  if (!location) return null;
  const mapUrl = `https://maps.google.com/maps?q=${location}&output=embed`;
  return (
    <div className="map">
      <iframe
        title="map"
        width="100%"
        height="300"
        className="map-iframe"
        loading="lazy"
        allowFullScreen
        src={mapUrl}
      />
    </div>
  );
};

export default MapView;

