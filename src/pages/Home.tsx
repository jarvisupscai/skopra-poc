import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  return (
    <section className="page home-page">
      <h1>Welcome to My Dashboard</h1>
      <button type="button" className="primary-button" onClick={handleNavigate}>
        Go to Dashboard
      </button>
    </section>
  );
};

export default Home;
