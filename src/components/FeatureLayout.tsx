import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type FeatureLayoutProps = {
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
};

const FeatureLayout = ({ title, description, badge = "Feature", children }: FeatureLayoutProps) => {
  return (
    <div className="feature-layout-page">
      <div className="feature-layout-shell">
        <header className="feature-layout-header">
          <Link to="/" className="back-button">
            &larr; Back to Dashboard
          </Link>

          <div className="feature-layout-heading">
            <span className="feature-layout-badge">{badge}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </header>

        <div className="feature-layout-body">{children}</div>
      </div>
    </div>
  );
};

export default FeatureLayout;
