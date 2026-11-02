
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Complaint = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: string;
  date: string;
};

type ComplaintContextType = {
  complaints: Complaint[];
  addComplaint: (complaint: Complaint) => void;
  updateStatus: (id: string, status: string) => void;
};

const ComplaintContext = createContext<ComplaintContextType | undefined>(
  undefined
);

export function ComplaintProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("civicpulse_complaints");
    if (saved) {
      setComplaints(JSON.parse(saved));
    }
  }, []);

  function saveComplaints(updated: Complaint[]) {
    setComplaints(updated);
    localStorage.setItem("civicpulse_complaints", JSON.stringify(updated));
  }

  function addComplaint(complaint: Complaint) {
    saveComplaints([...complaints, complaint]);
  }

  function updateStatus(id: string, status: string) {
    const updated = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status } : complaint
    );
    saveComplaints(updated);
  }

  return (
    <ComplaintContext.Provider
      value={{ complaints, addComplaint, updateStatus }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintContext);

  if (!context) {
    throw new Error("useComplaints must be used inside ComplaintProvider");
  }

  return context;
}