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
    <div className="feature-layout-page text-white">
      <div className="feature-layout-shell text-white">
        <header className="feature-layout-header">
          <Link to="/" className="back-button">
            ← Back
          </Link>

          <div className="feature-layout-heading">
            <span className="feature-layout-badge">{badge}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </header>

        <div className="feature-layout-body px-4 pb-12 pt-2 md:px-8">{children}</div>
      </div>
    </div>
  );
};

export default FeatureLayout;
