"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";

type Complaint = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: string;
};

const cityCenter: [number, number] = [12.9141, 74.856];

function getCoordinates(location: string): [number, number] {
  const place = location.toLowerCase();

  if (place.includes("adyar")) return [12.878, 74.88];
  if (place.includes("hampankatta")) return [12.8698, 74.8426];
  if (place.includes("bejai")) return [12.889, 74.853];
  if (place.includes("kadri")) return [12.884, 74.867];
  if (place.includes("kankanady")) return [12.869, 74.867];
  if (place.includes("urva")) return [12.891, 74.835];

  return cityCenter;
}

export default function MapView() {
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

  const createIcon = (status: string) => {
    const color =
      status.toLowerCase() === "resolved" ? "#208c55" : "#e34b4b";

    return L.divIcon({
      className: "",
      html: `<div style="background:${color};width:18px;height:18px;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px #555"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="interactive-map">
      <MapContainer
        center={cityCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%", borderRadius: "15px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {complaints.map((item) => (
          <Marker
            key={item.id}
            position={getCoordinates(item.location)}
            icon={createIcon(item.status)}
          >
            <Popup>
              <strong>{item.title}</strong>
              <br />
              Category: {item.category}
              <br />
              Location: {item.location}
              <br />
              Status: {item.status}
              <br />
              ID: {item.id}
              <br />
              <small>
                Pin location is approximate and based on the area name.
              </small>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}