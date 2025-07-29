
Akil's Weather App
A sleek weather application built with HTML, CSS, and JavaScript, featuring dynamic backgrounds, Lottie animations, and real-time weather data. Track conditions for any city with a modern, responsive design.
Features

Real-time weather updates for any city.
Dynamic background colors based on weather conditions (clear, cloudy, rain, thunderstorm, snow).
Lottie animations for visual weather effects.
City search with autocomplete suggestions.
Unit toggle between °C and °F.
Dark/light mode toggle.
Voice search support.
5-day weather forecast.
Geolocation-based weather on load.

Prerequisites

Node.js (v18.x or later) and npm installed.
Internet connection for API calls.
API keys from WeatherAPI and OpenWeatherMap.

Installation

Clone or Download the Repository:

Download the project files or clone the repo if hosted (e.g., git clone <repo-url>).


Install Dependencies:

Open a terminal in the project directory (C:\Uni\Weather App).
Run:npm install




Set Up API Keys:

Sign up for free API keys at WeatherAPI and OpenWeatherMap.
Open script.js and replace:
YOUR_NEW_WEATHERAPI_KEY with your WeatherAPI key.
YOUR_NEW_OPENWEATHERMAP_API_KEY with your OpenWeatherMap key.


Example:const weatherApiKey = "your-weatherapi-key-here";
const openWeatherApiKey = "your-openweathermap-key-here";




Add Lottie Animations:

Create a public/animations/ folder.
Download weather animations from LottieFiles (e.g., "sunny weather" as clear.json, etc.) and save as:
public/animations/clear.json
public/animations/cloudy.json
public/animations/rain.json
public/animations/thunderstorm.json
public/animations/snow.json




Set Up Manifest:

Create public/manifest.json with:{
  "name": "Akil's Weather App",
  "short_name": "Weather App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0a84ff"
}


<img width="1343" height="651" alt="image" src="https://github.com/user-attachments/assets/e0d55961-79fc-409e-93ad-046183577b90" />
<img width="492" height="624" alt="image" src="https://github.com/user-attachments/assets/4439f468-c387-4fdc-8d78-5eb0c733c5d2" />
<img width="492" height="624" alt="image" src="https://github.com/user-attachments/assets/4439f468-c387-4fdc-8d78-5eb0c733c5d2" />

Run the App:

Start the development server:npm run dev


Open http://localhost:5173 in your browser.



Usage

Search: Type a city name (e.g., "Mumbai") and press Enter or use voice search.
Toggle Units: Click "Switch to °F" to change temperature units.
Mode Switch: Click "🌙 Dark Mode" or "🌞 Light Mode" to toggle themes.
Geolocation: Allow location access for current weather on load.

Troubleshooting

404 Errors: Ensure manifest.json and animation files are in public/. Run dir public to verify.
400 Errors: Check API keys in script.js and test URLs manually (e.g., https://api.weatherapi.com/v1/forecast.json?key=your-key&q=Mumbai&days=5).
Console Errors: Open DevTools (F12) and review the Console tab.

Contributing
Feel free to fork this repo, make improvements, and submit pull requests. Suggestions for Mumbai-specific features (e.g., monsoon alerts) are welcome!
License
MIT License - Free to use and modify.
