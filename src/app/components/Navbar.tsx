
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        Civic<span>Pulse</span>
      </Link>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/report">Report Issue</Link>
        <Link href="/track">Track Complaint</Link>
        <Link href="/map">Issue Map</Link>
        <Link href="/admin">Admin Dashboard</Link>
      </div>

      <Link href="/report" className="nav-button">
        Report Now
      </Link>
    </nav>
  );
}