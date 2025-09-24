import type { FC } from 'react';
import './App.css';

const App: FC = () => {
  return (
    <div className="app">
      <header className="hero">
        <nav className="hero__nav">
          <div className="hero__brand" aria-label="Skopra">
            <span className="hero__brand-text">SKOPRA</span>
            <span className="hero__brand-dot" aria-hidden="true" />
          </div>
          <ul className="hero__links">
            <li><a href="#why">Why Skopra</a></li>
            <li><a href="#solutions">Solutions</a></li>
            <li><a href="#customers">Customers</a></li>
          </ul>
        </nav>
        <section className="hero__content">
          <h1>Build Outbound Systems That Don&apos;t Break.</h1>
          <p>
            Skopra helps B2B teams design outbound systems that align with their GTM
            strategy and revenue operations ensuring predictable pipeline without
            downstream friction.
          </p>
        </section>
        <div className="hero__blob" aria-hidden="true" />
      </header>
    </div>
  );
};

export default App;
