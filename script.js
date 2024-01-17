let searchInput = document.querySelector("#search-input");

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let city = searchInput.value;
    searchCity(city);
  }
});

function searchCity(city) {
  let apiKey = "08tc66c2dd234aae04o0a7f3aee015bc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then((response) => {
    const data = response.data;
    displayWeather(data);
    formatCurrentDateTime();
  });
}

function displayWeather(data) {
  let city = data.city;
  let temp = Math.round(data.temperature.current);

  let location = document.querySelector("#location");
  location.innerHTML = `${city}`;

  let weatherTemp = document.querySelector(".current-temperature-value");
  weatherTemp.innerHTML = `${temp}°`;
}

function formatCurrentDateTime() {
  const currentDate = new Date();

  const dayAndTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  }).format(currentDate);

  const dateTimeParagraph = document.getElementById("current-date-time");
  if (dateTimeParagraph) {
    dateTimeParagraph.innerHTML = `${dayAndTime}, rain <br />
        Humidity: <strong>94%</strong>, Wind: <strong>8km/h</strong>`;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();

  const cityName = document.querySelector(".search-input").value;

  const cityNameHeading = document.querySelector("h1");
  if (cityNameHeading) {
    cityNameHeading.textContent = cityName;
  }

  formatCurrentDateTime();
}

document.addEventListener("DOMContentLoaded", function () {
  formatCurrentDateTime();

  let intervalId = setInterval(formatCurrentDateTime, 60000);

  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);

  document.querySelector("form").addEventListener("submit", function () {
    clearInterval(intervalId);
  });
});
