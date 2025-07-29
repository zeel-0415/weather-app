const weatherApiKey = "e18f4e0ab91449c488c222120252807";
const openWeatherApiKey = "8f2c1f5b2df1bc50e0db9e82197f2dbf"; // Replace with your OpenWeatherMap API key
let isCelsius = true;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const unitToggle = document.getElementById("unit-toggle");
  const voiceBtn = document.getElementById("voice-search");
  const modeToggle = document.getElementById("mode-toggle");
  const searchInput = document.getElementById("search-input");
  const citySuggestions = document.getElementById("city-suggestions");

  // City suggestions
  
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();
    if (query.length < 3) {
      citySuggestions.innerHTML = "";
      return;
    }
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${openWeatherApiKey}`);
      if (!response.ok) throw new Error(`City fetch error! Status: ${response.status}`);
      const cities = await response.json();
      citySuggestions.innerHTML = "";
      cities.forEach(city => {
        const option = document.createElement("option");
        option.value = `${city.name}, ${city.country}`;
        citySuggestions.appendChild(option);
      });
    } catch (err) {
      console.error("City suggestion error:", err);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
  });

  unitToggle.addEventListener("click", () => {
    isCelsius = !isCelsius;
    unitToggle.textContent = `Switch to ${isCelsius ? "°F" : "°C"}`;
    const city = document.getElementById("city-name").textContent.split(",")[0];
    if (city) fetchWeather(city);
  });

  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    modeToggle.textContent = document.body.classList.contains("light-mode") ? "🌞 Light Mode" : "🌙 Dark Mode";
  });

  voiceBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const city = event.results[0][0].transcript;
      searchInput.value = city;
      fetchWeather(city);
    };
    recognition.start();
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => console.warn("Geolocation denied.")
    );
  }
});

function fetchWeather(query) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${query}&days=5`;
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Weather API error! Status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      updateUI(data);
      updateBackground(data.current.condition.text.toLowerCase());
    })
    .catch((err) => console.error("Weather error:", err));
}

function fetchWeatherByCoords(lat, lon) {
  fetchWeather(`${lat},${lon}`);
}

function updateUI(data) {
  const weatherDiv = document.getElementById("weather");
  const city = document.getElementById("city-name");
  const icon = document.getElementById("icon");
  const desc = document.getElementById("description");
  const temp = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const forecast = document.getElementById("forecast");

  city.textContent = `${data.location.name}, ${data.location.country}`;
  icon.src = data.current.condition.icon;
  desc.textContent = data.current.condition.text;

  temp.textContent = isCelsius ? data.current.temp_c : data.current.temp_f;
  document.querySelector("#temperature + sup").textContent = isCelsius ? "°C" : "°F";
  humidity.textContent = data.current.humidity;
  wind.textContent = data.current.wind_kph;

  forecast.innerHTML = "<h3>5-Day Forecast</h3>";
  data.forecast.forecastday.forEach((day, index) => {
    forecast.innerHTML += `
      <p style="animation-delay: ${index * 0.1}s">
        ${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}: 
        ${day.day.condition.text}, ${isCelsius ? day.day.avgtemp_c : day.day.avgtemp_f}${isCelsius ? '°C' : '°F'}
      </p>`;
  });

  weatherDiv.classList.remove("hidden");
}

function updateBackground(condition) {
  const body = document.body;
  const animation = document.getElementById("weather-animation");
  body.className = document.body.classList.contains("light-mode") ? "light-mode" : "";
  
  let animationSrc = "/animations/clear.json";
  if (condition.includes("cloud")) {
    body.classList.add("clouds");
    animationSrc = "/animations/cloudy.json";
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    body.classList.add("rain");
    animationSrc = "/animations/rain.json";
  } else if (condition.includes("thunder") || condition.includes("storm")) {
    body.classList.add("thunderstorm");
    animationSrc = "/animations/thunderstorm.json";
  } else if (condition.includes("snow")) {
    body.classList.add("snow");
    animationSrc = "/animations/snow.json";
  } else if (condition.includes("clear") || condition.includes("sunny")) {
    body.classList.add("clear");
    animationSrc = "/animations/clear.json";
  }

  // Check if animation file exists to avoid 404
  fetch(animationSrc, { method: 'HEAD' })
    .then(res => {
      if (res.ok) {
        animation.src = animationSrc;
      } else {
        console.warn(`Animation ${animationSrc} not found, using default`);
        animation.src = "/animations/clear.json";
      }
    })
    .catch(() => {
      console.warn(`Failed to check ${animationSrc}, using default`);
      animation.src = "/animations/clear.json";
    });
}