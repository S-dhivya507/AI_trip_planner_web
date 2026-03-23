import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/api/trip", async (req, res) => {
  const { destination, days } = req.body;

  const prompt = `
Create a ${days}-day trip plan for ${destination}.
Include morning, afternoon, and evening activities.
Include a packing list.
Return ONLY JSON in this format:

{
  "location": "${destination}",
  "itinerary": [
    { "day": 1, "morning": "...", "afternoon": "...", "evening": "..." }
  ],
  "packingList": ["Passport","Clothes","Camera","Charger"]
}
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",   // ✅ FIXED MODEL
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("Groq raw response:", JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices.length) {
      throw new Error("No choices returned from Groq");
    }

    let text = data.choices[0].message.content;
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let tripData;
    try {
      tripData = JSON.parse(text);
    } catch {
      tripData = createFallbackTrip(destination, days);
    }

    res.json(tripData);

  } catch (err) {
    console.error("Groq API error:", err.message);
    res.json(createFallbackTrip(destination, days));
  }
});

function createFallbackTrip(destination, days) {
  return {
    location: destination,
    itinerary: Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      morning: `Explore ${destination}`,
      afternoon: "Try local food",
      evening: "Relax and enjoy the city"
    })),
    packingList: ["Passport", "Clothes", "Camera", "Charger"]
  };
}


app.post("/api/recommendations", async (req, res) => {
  const { location } = req.body;
  try {
    // Example prompt to AI
    const prompt = `Give me 5 must-visit tourist places in ${location} with a short description for each. Respond as JSON array of { name, description }.`;

    // Call your AI service (OpenAI/Groq/Gemini)
    const aiResponse = await callAI(prompt);

    // Parse JSON safely
    let places = [];
    try {
      const cleaned = String(aiResponse)
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      places = JSON.parse(cleaned);
    } catch {
      console.warn("Fallback: AI returned invalid JSON, using empty array");
    }

    res.json({ places });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get AI recommendations" });
  }
});

async function callAI(prompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Groq error ${response.status}: ${data?.error?.message || "Unknown error"}`
    );
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Groq returned empty content");
  return content;
}

const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});



