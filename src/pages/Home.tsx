import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard');
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
            <button type="button" className="primary-button" onClick={handleNavigate}>
              Go to Dashboard
            </button>
          </div>
        </section>
      </div>
      <div className="hero__blob" aria-hidden="true" />
    </div>
  );
};

export default Home;
