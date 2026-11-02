"use client";

import { useEffect, useState } from "react";

type Complaint = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: string;
  date?: string;
};

export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("civicpulse_complaints");

    if (saved) {
      setComplaints(JSON.parse(saved));
    }
  }, []);

  function updateStatus(id: string, newStatus: string) {
    const updated = complaints.map((complaint) =>
      complaint.id === id
        ? { ...complaint, status: newStatus }
        : complaint
    );

    setComplaints(updated);
    localStorage.setItem(
      "civicpulse_complaints",
      JSON.stringify(updated)
    );
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f0f8f2",
      padding: "50px 20px"
    }}>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h1 style={{ color: "#183c29", fontSize: "36px" }}>
          Admin Dashboard
        </h1>

        <p style={{ color: "#68776d", marginBottom: "30px" }}>
          Manage and update public infrastructure complaints.
        </p>

        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "25px"
        }}>
          <h2 style={{ color: "#208c55" }}>
            Total Complaints: {complaints.length}
          </h2>
        </div>

        {complaints.length === 0 ? (
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px"
          }}>
            No complaints have been submitted yet.
          </div>
        ) : (
          complaints.map((complaint) => (
            <div key={complaint.id} style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              marginBottom: "20px",
              border: "1px solid #e3eee5"
            }}>
              <h2 style={{ color: "#183c29" }}>
                {complaint.title}
              </h2>

              <p><b>Complaint ID:</b> {complaint.id}</p>
              <p><b>Category:</b> {complaint.category}</p>
              <p><b>Location:</b> {complaint.location}</p>
              <p><b>Description:</b> {complaint.description}</p>
              <p><b>Current Status:</b> {complaint.status}</p>

              <label style={{
                display: "block",
                marginTop: "15px",
                fontWeight: "bold"
              }}>
                Update Complaint Status:
              </label>

              <select
                value={complaint.status}
                onChange={(e) =>
                  updateStatus(complaint.id, e.target.value)
                }
                style={{
                  padding: "12px",
                  marginTop: "10px",
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "7px",
                  border: "1px solid #ccc"
                }}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
