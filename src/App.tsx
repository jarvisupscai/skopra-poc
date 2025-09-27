import type { FC } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import './App.css';

const NotFound: FC = () => (
  <section className="page">
    <h1>Page Not Found</h1>
    <p>The page you requested does not exist.</p>
  </section>
);

const App: FC = () => {
  return (
    <div className="app">
      <header className="site-header">
        <nav className="hero__nav">
          <div className="hero__brand" aria-label="Skopra">
            <span className="hero__brand-text">SKOPRA</span>
            <span className="hero__brand-dot" aria-hidden="true" />
          </div>
          <ul className="hero__links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? 'hero__link hero__link--active' : 'hero__link'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'hero__link hero__link--active' : 'hero__link'
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'hero__link hero__link--active' : 'hero__link'
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
