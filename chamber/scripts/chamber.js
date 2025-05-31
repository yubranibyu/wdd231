
// Toggle Menu
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Footer Dates
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent =
  "Last modified: " + document.lastModified;

// Weather API Setup
const apiKey = "YOUR_API_KEY";  // <- Reemplaza con tu API key de OpenWeatherMap
const city = "Caxias do Sul,BR";
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

// Get Current Weather
async function getWeather() {
  try {
    const res = await fetch(weatherURL);
    const data = await res.json();
    document.getElementById("temp").textContent = data.main.temp.toFixed(1);
    document.getElementById("desc").textContent = data.weather[0].description;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById("icon").alt = data.weather[0].description;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Get 3-day Forecast (at 12:00)
async function getForecast() {
  try {
    const res = await fetch(forecastURL);
    const data = await res.json();
    const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    const forecastUl = document.getElementById("forecast-list");
    forecastUl.innerHTML = ""; // Clear previous content
    
    forecastList.slice(0, 3).forEach(forecast => {
      const li = document.createElement("li");
      const date = new Date(forecast.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      li.textContent = `${date}: ${forecast.main.temp.toFixed(1)}°C`;
      forecastUl.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

// Load Member Spotlights
async function loadSpotlights() {
  try {
    const res = await fetch("data/members.json");
    const data = await res.json();
    const goldOrSilver = data.members.filter(
      m => m.membership === "Gold" || m.membership === "Silver"
    );

    const spotlights = goldOrSilver.sort(() => 0.5 - Math.random()).slice(0, 3);
    const container = document.getElementById("spotlight-container");
    container.innerHTML = ""; // Clear previous content

    spotlights.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight");
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${member.image}" alt="${member.name} logo" />
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        <p><strong>${member.membership} Member</strong></p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

// Initialize
getWeather();
getForecast();
loadSpotlights();
