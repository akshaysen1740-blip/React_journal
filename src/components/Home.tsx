import FeatureCard from "./FeatureCard";
import features from "../data/features.json";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Explore UI Experiments</h1>
      </header>

      <section className="feature-section">
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
