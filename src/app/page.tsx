import Link from "next/link";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <main>
      <Navbar />
        

      <section className="hero">
        <div className="hero-content">
          <p className="tagline">
            BUILDING A BETTER MANGALURU
          </p>
          <h1>
            Let's Make Our City
            <span> Better Together.</span>
          </h1>

          <p className="hero-description">
            Report public infrastructure problems,
            track their progress, and help make
            Mangaluru a cleaner, safer and better
            place for everyone.
          </p>

          <div className="hero-buttons">
            <Link href="/report" className="primary-button">
              Report an Issue →
            </Link>

            <Link href="/track" className="secondary-button">
              Track Complaint
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-icon">🏙️</div>
          <h2>Your City. Your Voice.</h2>
          <p>
            Every report brings us one step closer
            to a better community.
          </p>

          <div className="mini-stats">
            <div>
              <h3>01</h3>
              <p>Report</p>
            </div>
            <div>
              <h3>02</h3>
              <p>Track</p>
            </div>
            <div>
              <h3>03</h3>
              <p>Resolve</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <p className="tagline">HOW CIVICPULSE WORKS</p>
          <h2>Small Reports. Big Changes.</h2>
          <p>
            Help us identify and resolve everyday
            infrastructure problems.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <span>01</span>
            <h3>Report Problems</h3>
            <p>
              Report potholes, damaged streetlights,
              water leaks and other public issues.
            </p>
          </div>

          <div className="feature-card">
            <span>02</span>
            <h3>Track Progress</h3>
            <p>
              Use your complaint ID to check the
              latest status of your report.
            </p>
          </div>

          <div className="feature-card">
            <span>03</span>
            <h3>See Improvements</h3>
            <p>
              Follow reported issues and see when
              problems are marked as resolved.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <h2>CivicPulse</h2>
        <p>Working together for a better Mangaluru.</p>
        <p>© 2026 CivicPulse Community Project</p>
      </footer>
    </main>
  );
}