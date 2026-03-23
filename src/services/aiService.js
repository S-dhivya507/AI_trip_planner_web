const API_BASE = import.meta.env.PROD ? "" : "http://localhost:5000";

export const generateTripPlan = async (destination, days) => {
  const res = await fetch(`${API_BASE}/api/trip`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destination, days }),
  });
  if (!res.ok) throw new Error("Failed to fetch from backend");
  return res.json();
};

// src/services/aiService.js
export const getRecommendations = async (location) => {
  try {
    const res = await fetch(`${API_BASE}/api/recommendations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location }),
    });

    if (!res.ok) throw new Error("AI API failed");

    const data = await res.json();

    // Expected format: [{ name: "Place 1", description: "..." }, ...]
    return data.places;
  } catch (err) {
    console.error("AI Recommendation error:", err);
    return [];
  }
};



