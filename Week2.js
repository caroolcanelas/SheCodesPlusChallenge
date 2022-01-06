/* Current time and day */
let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let day = weekDay[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let realTime = document.querySelector(".dateTime");
realTime.innerHTML = `${day}, ${date},  ${hour}:${minutes}`;

/* Forecast */

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class='forecast-date'><p>${formatDay(forecastDay.dt)}</p></div>
        <p><img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        /></p>
        <div class='forecast-temp'>
        <p><span class='forecast-max-temp'>${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class='forecast-min-temp'> ${Math.round(
          forecastDay.temp.min
        )}°</span></p>
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8cbd64a63ba04c3afa29f0681a36cb68";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

/* Celsius and Fahrenheit conversion*/

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("celsius");
  fahrenheitLink.classList.add("celsius");
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("celsius");
  fahrenheitLink.classList.remove("celsius");
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", convertToCelsius);

/* Main Block (real temperature, place and detailed info*/

function showTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  let description = document.querySelector(".card-description");
  let cityElement = document.querySelector(".city");
  let iconElement = document.querySelector("#icon");

  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  description.innerHTML = response.data.weather[0].description;
  getForecast(response.data.coord);
}

/*Principal city when the site starts*/

let apiKey = "8cbd64a63ba04c3afa29f0681a36cb68";
let city = "Rio de Janeiro";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

/*Search for the user's city of choice*/

function searchCity(event) {
  event.preventDefault();
  let apiKey = "8cbd64a63ba04c3afa29f0681a36cb68";
  let cityName = document.querySelector(".search");
  let city = cityName.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", searchCity);

/*Current position button*/

function showPosition(position) {
  let apiKey = "8cbd64a63ba04c3afa29f0681a36cb68";
  let lat = Math.round(position.coords.latitude);
  let long = Math.round(position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".current-button");
button.addEventListener("click", getCurrentPosition);
