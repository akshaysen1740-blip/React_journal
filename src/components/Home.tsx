import FeatureCard from "./FeatureCard";
import features from "../data/features.json";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header-badge">Design System 1.0</div>
        <h1>UI Experiments Dashboard</h1>
        <p>Interactive playground for high-performance React component patterns and event lifecycles.</p>
      </header>

      <section className="hero-panel">
        <span className="hero-label">Overview</span>
        <h2>Optimized Event Flow & State Management</h2>
        <p>
          Explore interactive component demonstrations designed to isolate lifecycle behavior, rate-limiting, and timing control.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="value">{features.length}</div>
            <div className="label">Live Experiments</div>
          </div>
          <div className="stat-card">
            <div className="value">React 19</div>
            <div className="label">Framework Engine</div>
          </div>
          <div className="stat-card">
            <div className="value">60 FPS</div>
            <div className="label">Target Performance</div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-header">
          <h3>Available Modules</h3>
          <span>Select an experiment to launch</span>
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

