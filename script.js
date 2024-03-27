// updating the day&time section
const time = document.querySelector(".time");
const date_el = document.querySelector(".date");
const am_pm = document.getElementById("am-pm");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
setInterval(() => {
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();
  const day = now.getDay();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const amPm = hour >= 12 ? "PM" : "AM";
  const hoursFormatted = hour >= 13 ? hour % 12 : hour;

  console.log(days[day] + "," + date + months[month]);
  time.innerHTML =
    hoursFormatted + ":" + minutes + " " + `<span>${amPm}</span>`;

  date_el.innerHTML = days[day] + " , " + date + " " + months[month];
}, 1000);

// updating weather info
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const Error404 = document.querySelector(".error404");

search.addEventListener("click", () => {
  const APIKey = "7ef5739878579d383511fec20d0bf615";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "35rem";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        Error404.classList.add("active");

        return;
      }

      // container.style.height = "34.6875rem";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      Error404.classList.remove("active");
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        case "Haze":
          image.src = "images/haze.png";
          break;
        default:
          image.src = "images/cloud.png";
          break;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});
