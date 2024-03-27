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
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
  const amPm = hour >= 12 ? "PM" : "AM";
  const hoursFormatted = hour >= 13 ? hour % 12 : hour;

  time.innerHTML =
    hoursFormatted + ":" + minutesFormatted + " " + `<span>${amPm}</span>`;

  date_el.innerHTML = days[day] + " , " + date + " " + months[month];
}, 1000);

// updating weather info
const body = document.querySelector("body");
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const Error404 = document.querySelector(".error404");
const cityHidden = document.querySelector(".city-hidden");

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
        cityHidden.textContent = city;
        container.style.height = "35rem";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        Error404.classList.add("active");

        return;
      }

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const feel = document.querySelector(".weather-box .feels");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const sunrise = document.querySelector(".weather-details .sunrise span");
      const sunset = document.querySelector(".weather-details .sunset span");
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHidden.textContent == city) {
        return;
      } else {
        cityHidden.textContent = city;
        container.style.height = "50rem";
        weatherBox.classList.add("active");
        container.classList.add("active");
        weatherDetails.classList.add("active");
        Error404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove("active");
        }, 2500);

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
        document.querySelector(
          ".weather-box .location .city"
        ).innerHTML = `${json.name}`;
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        feel.innerHTML = `${parseInt(json.main.feels_like)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        sunrise.innerHTML = `${window
          .moment(json.sys.sunrise * 1000)
          .format("HH:mm a")}`;
        sunset.innerHTML = `${window
          .moment(json.sys.sunset * 1000)
          .format("HH:mm a")}`;

        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");
        const infoSunrise = document.querySelector(".info-sunrise");
        const infoSunset = document.querySelector(".info-sunset");

        const cloneInfoWeather = infoWeather.cloneNode(true);
        const cloneInfoHumidity = infoHumidity.cloneNode(true);
        const cloneInfoWind = infoWind.cloneNode(true);
        const cloneInfoSunrise = infoSunrise.cloneNode(true);
        const cloneInfoSunset = infoSunset.cloneNode(true);

        cloneInfoWeather.id = "clone-info-weather";
        cloneInfoWeather.classList.add("active-clone");

        cloneInfoHumidity.id = "clone-info-humidity";
        cloneInfoHumidity.classList.add("active-clone");

        cloneInfoWind.id = "clone-info-wind";
        cloneInfoWind.classList.add("active-clone");

        cloneInfoSunrise.id = "clone-info-sunrise";
        cloneInfoSunrise.classList.add("active-clone");

        cloneInfoSunset.id = "clone-info-sunset";
        cloneInfoSunset.classList.add("active-clone");

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", cloneInfoWeather);
          infoHumidity.insertAdjacentElement("afterend", cloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", cloneInfoWind);
          infoSunrise.insertAdjacentElement("afterend", cloneInfoSunrise);
          infoSunset.insertAdjacentElement("afterend", cloneInfoSunset);
        }, 2000);

        const elcloneInfoWeather = document.querySelectorAll(
          ".info-weather.active-clone"
        );
        const totalCloneInfoWeather = elcloneInfoWeather.length;
        const elcloneInfoWeatherFirst = elcloneInfoWeather[0];

        const elcloneInfoHumidity = document.querySelectorAll(
          ".info-humidity.active-clone"
        );
        const elcloneInfoHumidityFirst = elcloneInfoHumidity[0];

        const elcloneInfoWind = document.querySelectorAll(
          ".info-wind.active-clone"
        );
        const elcloneInfoWindFirst = elcloneInfoWind[0];

        const elcloneInfoSunrise = document.querySelectorAll(
          ".info-sunrise.active-clone"
        );
        const elcloneInfoSunriseFirst = elcloneInfoSunrise[0];

        const elcloneInfoSunset = document.querySelectorAll(
          ".info-sunset.active-clone"
        );
        const elcloneInfoSunsetFirst = elcloneInfoSunset[0];

        if (totalCloneInfoWeather > 0) {
          elcloneInfoWeatherFirst.classList.remove("active-clone");
          elcloneInfoHumidityFirst.classList.remove("active-clone");
          elcloneInfoWindFirst.classList.remove("active-clone");
          elcloneInfoSunriseFirst.classList.remove("active-clone");
          elcloneInfoSunsetFirst.classList.remove("active-clone");

          setTimeout(() => {
            elcloneInfoWeatherFirst.remove();
            elcloneInfoHumidityFirst.remove();
            elcloneInfoWindFirst.remove();
            elcloneInfoSunriseFirst.remove();
            elcloneInfoSunsetFirst.remove();
          }, 2000);
        }
      }
    });
});
