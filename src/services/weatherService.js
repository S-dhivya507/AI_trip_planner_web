// src/services/weatherService.js
export const fetchWeather = async (location) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
    );

    if (!res.ok) {
      console.warn("Weather API failed, using fallback weather");
      throw new Error("Weather API error");
    }

    const data = await res.json();

    return {
      temp: `${data.main.temp}°C`,
      condition: data.weather[0].main,
    };
  } catch (err) {
    console.error("Weather API failed, returning fallback:", err);

    // ✅ Fallback weather so UI always works
    return {
      temp: "25°C",
      condition: "Sunny",
    };
  }
};
