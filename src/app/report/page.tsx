"use client";

import { useState } from "react";
import { useComplaints } from "../ComplaintContext";

export default function ReportPage() {
  const { addComplaint } = useComplaints();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Roads & Potholes");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [ticket, setTicket] = useState("");
  const [image, setImage] = useState<File | null>(null);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const complaint = {
      id: "CP-" + Date.now(),
      title,
      category,
      location,
      description,
      image,
      status: "Open",
      date: new Date().toLocaleDateString(),
    };
    addComplaint(complaint);
    setTicket(complaint.id);
    setTitle("");
    setLocation("");
    setDescription("");
    setImage(null);
  }

  return (
    <main className="report-page">
      <div className="report-container">
        <p className="tagline">HELP IMPROVE YOUR CITY</p>
        <h1>Report an Issue</h1>

        <p className="report-intro">
          Found an infrastructure problem in Mangaluru?
          Tell us about it. Your report can make a difference.
        </p>

        {ticket ? (
          <div className="success-message">
            <h2>Report Submitted Successfully!</h2>
            <p>Your complaint ID is:</p>
            <h3>{ticket}</h3>
            <p>Save this ID to track your complaint.</p>
            <button onClick={() => setTicket("")}>
              Submit Another Report
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="report-form">
            <label>Issue Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Large pothole near main road"
              required
            />
            <div className="form-group">
  <label htmlFor="problem-image">
    Upload Problem Photo
  </label>

  <input
    id="problem-image"
    type="file"
    accept="image/*"
    onChange={(e) =>
      setImage(e.target.files?.[0] || null)
    }
  />

  {image && (
    <p>Selected: {image.name}</p>
  )}
</div>
            

            <label>Issue Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Roads & Potholes</option>
              <option>Streetlights</option>
              <option>Water Leakage</option>
              <option>Drainage Problems</option>
              <option>Garbage Overflow</option>
              <option>Other</option>
            </select>

            <label>Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Example: Hampankatta, Mangaluru"
              required
            />

            <label>Describe the Problem</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the issue..."
              rows={5}
              required
            />

            <button type="submit" className="submit-button">
              Submit Complaint →
            </button>
          </form>
        )}
      </div>
    </main>
  );
}