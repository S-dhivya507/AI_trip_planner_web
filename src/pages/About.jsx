const About = () => {
  return (
    <section className="page">
      <div className="hero hero--compact">
        <div className="hero-copy">
          <p className="eyebrow">About</p>
          <h1>Plan trips faster, with less stress</h1>
          <p>
            AI Trip Planner turns a destination and trip length into a clean,
            structured plan you can actually use—daily itinerary, weather,
            maps, and a practical packing checklist.
          </p>
        </div>
      </div>

      <div className="about-stats">
        <div className="card stat-card card-static">
          <p className="stat-kicker">Output</p>
          <p className="stat-big">Itinerary</p>
          <p className="stat-note">Morning / afternoon / evening structure</p>
        </div>
        <div className="card stat-card card-static">
          <p className="stat-kicker">Context</p>
          <p className="stat-big">Weather</p>
          <p className="stat-note">Quick snapshot for planning outfits</p>
        </div>
        <div className="card stat-card card-static">
          <p className="stat-kicker">Practical</p>
          <p className="stat-big">Packing</p>
          <p className="stat-note">A checklist you can export or print</p>
        </div>
      </div>

      <div className="about-grid">
        <div className="card card-static">
          <h2>Why this planner?</h2>
          <ul className="feature-list">
            <li>Readable, well-structured plans (not a long paragraph)</li>
            <li>Balanced pacing: explore, eat well, and rest</li>
            <li>Export-friendly overview for sharing and printing</li>
          </ul>

          <div className="about-callout">
            <p className="about-callout-title">Designed for clarity</p>
            <p className="about-callout-text">
              Each day is organized into three simple blocks so you can skim,
              adjust, and share quickly.
            </p>
          </div>
        </div>

        <div className="card card-static">
          <h2>How it works</h2>
          <ol className="steps-list">
            <li>Enter a destination and number of days.</li>
            <li>Generate a trip plan with itinerary + packing list.</li>
            <li>Review the overview and export it as a PDF.</li>
          </ol>

          <div className="about-divider" />

          <h2>What to expect</h2>
          <ul className="feature-list">
            <li>Quick results with sensible defaults</li>
            <li>Good starting point you can personalize</li>
            <li>Clean layout across desktop and mobile</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;

