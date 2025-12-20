import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => () => {
    navigate(path);
  };

  return (
    <div className="hero">
      <div className="hero__inner">
        <section className="hero__content">
          <h1>Build Outbound Systems That Don&apos;t Break.</h1>
          <p>
            Skopra helps B2B teams design outbound systems that align with their go-to-market
            strategy and revenue operations, delivering predictable pipeline without downstream
            friction.
          </p>
          <div className="hero__actions">
            <button type="button" className="primary-button" onClick={handleNavigate('/dashboard')}>
              Go to Dashboard
            </button>
            <button type="button" className="secondary-button" onClick={handleNavigate('/fit-validator/start')}>
              Start Fit Validator
            </button>
          </div>
        </section>
      </div>
      <div className="hero__blob" aria-hidden="true" />
    </div>
  );
};

export default Home;
