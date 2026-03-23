const PackingList = ({ items }) => {
  if (!items) return null;
  return (
    <div className="packing">
      <ul className="packing-list">
        {items.map((item, i) => (
          <li key={i}>
            <span className="check" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackingList;
