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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <div class='forecast-date'><p>${day}</p></div>
        <p><img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        /></p>
        <div class='forecast-temp'>
        <p><span class='forecast-max-temp'>31°</span>
        <span class='forecast-min-temp'> 27°</span></p>
      </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

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
}

let apiKey = "8cbd64a63ba04c3afa29f0681a36cb68";
let city = "Rio de Janeiro";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

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

displayForecast();
