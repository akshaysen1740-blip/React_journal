import { Link } from "react-router-dom";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  path: string;
};

const FeatureCard = ({ icon, title, description, path }: FeatureCardProps) => {
  return (
    <article className="feature-card">
      <div className="feature-card-top">
        <div className="feature-icon">{icon}</div>
      </div>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <Link className="feature-link" to={path}>
        Open {title} &rarr;
      </Link>
    </article>
  );
};

export default FeatureCard;
