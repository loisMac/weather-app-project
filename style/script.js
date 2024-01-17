function formatCurrentDateTime() {
  const currentDate = new Date();

  const dayAndTime = new Intl.DateTimeFormat("en-GB", {
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

  setInterval(formatCurrentDateTime, 60000);
});
document.querySelector("form").addEventListener("submit", handleFormSubmission);
