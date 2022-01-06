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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = 19;
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
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
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
