import { $ } from "./utils.js";

const weatherCodes = {
  0: ["☀", "Clear skies"],
  1: ["🌤", "Mostly clear"],
  2: ["⛅", "Partly cloudy"],
  3: ["☁", "Cloudy"],
  45: ["🌫", "Misty"],
  51: ["🌦", "Light drizzle"],
  61: ["🌧", "Rain showers"],
  71: ["❄", "Snowy"]
};

export async function updateWeather() {
  try {
    let latitude = 12.9716;
    let longitude = 77.5946;
    let location = "Bengaluru, India";

    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 3500
        });
      });

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      location = "Your location";
    }

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
    );

    if (!response.ok) throw new Error("Weather request failed");

    const data = await response.json();
    const current = data.current;

    const weather =
      weatherCodes[current.weather_code] || ["🌤", "Pleasant weather"];

    $("#temperature").textContent = `${Math.round(current.temperature_2m)}°`;
    $("#weatherIcon").textContent = weather[0];
    $("#weatherDescription").textContent = weather[1];
    $("#weatherLocation").textContent = location;
  } catch {
    $("#weatherLocation").textContent = "Bengaluru, India";
  }
}