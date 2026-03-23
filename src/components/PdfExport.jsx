const PdfExport = () => {
  return (
    <button className="btn btn-secondary" onClick={() => window.print()}>
      Export PDF
    </button>
  );
};

export default PdfExport;
