"use client";

import { useState } from "react";

type Complaint = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: string;
  date: string;
};

export default function TrackPage() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [message, setMessage] = useState("");

  function trackComplaint() {
    const saved = localStorage.getItem("civicpulse_complaints");
    const complaints: Complaint[] = saved ? JSON.parse(saved) : [];

    const found = complaints.find(
      (item) => item.id.toLowerCase() === complaintId.trim().toLowerCase()
    );

    if (found) {
      setComplaint(found);
      setMessage("");
    } else {
      setComplaint(null);
      setMessage("Complaint not found. Please check your complaint ID.");
    }
  }

  return (
    <main className="report-page">
      <div className="report-container">
        <p className="report-intro">CIVICPULSE • MANGALURU</p>
        <h1>Track Your Complaint</h1>
        <p className="report-intro">
          Enter your complaint ID to check the latest status.
        </p>

        <div className="report-form">
          <label>Complaint ID</label>
          <input
            type="text"
            placeholder="Example: CP-1793378276203"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
          />

          <button className="submit-button" onClick={trackComplaint}>
            Track Complaint
          </button>

          {message && <p>{message}</p>}

          {complaint && (
            <div className="success-message">
              <h2>Complaint Found!</h2>
              <p><strong>ID:</strong> {complaint.id}</p>
              <p><strong>Issue:</strong> {complaint.title}</p>
              <p><strong>Category:</strong> {complaint.category}</p>
              <p><strong>Location:</strong> {complaint.location}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}