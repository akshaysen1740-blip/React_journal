import FeatureCard from "./FeatureCard";
import features from "../data/features.json";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-panel">
        <span className="hero-label">Explore features</span>
        <h1>Build better experiences with focused UI experiments.</h1>
        <p>
          A clean workspace for interactive patterns, reusable components, and
          polished frontend demos designed to scale as new functionality is
          added.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="value">04</div>
            <div className="label">Active modules</div>
          </div>
          <div className="stat-card">
            <div className="value">24/7</div>
            <div className="label">Workflow access</div>
          </div>
          <div className="stat-card">
            <div className="value">99%</div>
            <div className="label">Design focus</div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-header">
          <h3>Featured tools</h3>
          <span>Core controls</span>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              path={feature.path}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
