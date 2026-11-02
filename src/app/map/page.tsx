"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <p>Loading Mangaluru map...</p>,
});

type Complaint = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: string;
};

export default function MapPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("civicpulse_complaints");

    if (saved) {
      try {
        setComplaints(JSON.parse(saved));
      } catch {
        setComplaints([]);
      }
    }
  }, []);

  const pending = complaints.filter(
    (item) => item.status.toLowerCase() !== "resolved"
  ).length;

  const resolved = complaints.length - pending;

  return (
    <main>
      <nav className="navbar">
        <Link href="/" className="logo">
          Civic<span>Pulse</span>
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/report">Report Issue</Link>
          <Link href="/track">Track Complaint</Link>
          <Link href="/map">Issue Map</Link>
        </div>

        <Link href="/report" className="nav-button">
          Report Now
        </Link>
      </nav>

      <section className="map-page">
        <div className="map-container">
          <p className="tagline">MANGALURU COMMUNITY REPORTS</p>
          <h1>Public Issue Map</h1>
          <p className="report-intro">
            Explore infrastructure problems reported by citizens.
          </p>

          <div className="map-summary">
            <div>
              <h2>{complaints.length}</h2>
              <p>Total Reports</p>
            </div>

            <div>
              <h2>{pending}</h2>
              <p>Pending Reports</p>
            </div>

            <div>
              <h2>{resolved}</h2>
              <p>Resolved Reports</p>
            </div>
          </div>

          <h2 className="map-list-heading">
            Interactive Mangaluru Map
          </h2>

          <div style={{ marginBottom: "15px" }}>
            <span style={{ color: "#e34b4b" }}>● Pending</span>
            {"   "}
            <span style={{ color: "#208c55" }}>● Resolved</span>
          </div>

          <MapView />

          <h2 className="map-list-heading" style={{ marginTop: "35px" }}>
            Reported Issues
          </h2>

          {complaints.length === 0 ? (
            <div className="empty-map">
              <h3>No reports yet</h3>
              <p>Be the first to report an infrastructure issue.</p>
              <Link href="/report" className="primary-button">
                Report an Issue
              </Link>
            </div>
          ) : (
            <div className="issue-list">
              {complaints.map((item) => (
                <div className="issue-card" key={item.id}>
                  <div className="issue-card-top">
                    <span className="issue-category">
                      {item.category}
                    </span>
                    <span className="issue-status">{item.status}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>Location: {item.location}</p>
                  <p>{item.description}</p>
                  <small>Complaint ID: {item.id}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}