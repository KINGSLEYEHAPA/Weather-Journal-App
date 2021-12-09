goBtn = document.querySelector("#send");
const dashboard = document.querySelector(".dashboard");
let backgroundCover = document.querySelector("body");

goBtn.addEventListener("click", retrieveData);

async function retrieveData(e) {
  const zip = document.querySelector("#cityInput").value;
  const apiKey = "eebe977cc40a76610abf0f365528ca2d";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=${apiKey}&units=${unit}&zip=${zip}`;

  const newWeatherData = await getData(url)
    .then(function (newWeatherData) {
      console.log(newWeatherData);
      if (newWeatherData.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = newWeatherData.message;
        setTimeout(function () {
          error.textContent = "";
        }, 3000);
      }

      const imageFile = [
        "url('img/broken-clouds.jfif')",
        "url('img/clear-sky.jpg')",
        "url('img/haze.jfif')",
        "url('img/heavy-rain.jpg')",
        "url('img/light-rain.jpg')",
        "url('img/light-snow.jfif')",
        "url('img/mist.jfif')",
        "url('img/overcast-clouds.jpg')",
        "url('img/snow.jpg')",
      ];
      console.log(backgroundCover);
      if (newWeatherData.weather[0].description === "broken clouds") {
        backgroundCover.style.backgroundImage = imageFile[0];
      } else if (newWeatherData.weather[0].description === "clear sky") {
        backgroundCover.style.backgroundImage = imageFile[1];
      } else if (newWeatherData.weather[0].description === "haze") {
        backgroundCover.style.backgroundImage = imageFile[2];
      } else if (newWeatherData.weather[0].description === "heavy rain") {
        backgroundCover.style.backgroundImage = imageFile[3];
      } else if (newWeatherData.weather[0].description === "light rain") {
        backgroundCover.style.backgroundImage = imageFile[4];
      } else if (newWeatherData.weather[0].description === "light snow") {
        backgroundCover.style.backgroundImage = imageFile[5];
      } else if (newWeatherData.weather[0].description === "mist") {
        backgroundCover.style.backgroundImage = imageFile[6];
      } else if (newWeatherData.weather[0].description === "overcast clouds") {
        backgroundCover.style.backgroundImage = imageFile[7];
      } else if (newWeatherData.weather[0].description === "snow") {
        backgroundCover.style.backgroundImage = imageFile[8];
      }

      const weatherConditionImage = document.querySelector(".condition img");
      const weatherCondition = document.querySelector(".condition-info");
      weatherCondition.textContent = newWeatherData.weather[0].description;
      const icon = newWeatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      weatherConditionImage.src = imageUrl;
      const temp = newWeatherData.main.temp + "°C";
      const city = newWeatherData.name;
      const userResponse = document.querySelector("#user-feeling").value;
      const date = new Date();
      const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
      let day = days[date.getDay()];
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
      const month = months[date.getMonth()];
      let dateNumber = date.getDate();
      let year = date.getFullYear();

      const today = `${day} ${month} ${dateNumber}, ${year}.`;
      console.log(today);

      const data = { temp: "", date: "", userResponse: "", city: "" };
      data.temp = temp;
      data.date = today;
      data.userResponse = userResponse;
      data.city = city;

      postData("/savedata", data);
    })
    .then(function () {
      updateUI();
    });
}

const updateUI = async () => {
  const request = await fetch("/retrievedata");
  try {
    const serverData = await request.json();

    const location = document.querySelector(".city p");
    const temp = document.querySelector(".temp-data");

    if (serverData.temp > 25) {
      temp.style.color = "red";
    } else {
      temp.style.color = "blue";
    }
    temp.textContent = serverData.temp;

    location.textContent = serverData.city;

    const dateSpan = document.querySelector(".date");
    dateSpan.textContent = serverData.date;
    const userMessage = document.querySelector(".user-message");

    userMessage.textContent = serverData.userResponse;

    dashboard.style.display = "flex";
    document.querySelector("#cityInput").value = "";
    document.querySelector("#user-feeling").value = "";
  } catch (error) {
    console.log("error", error);
  }
};

const refresh = document.querySelector("#refresh");
refresh.addEventListener("click", () => {
  dashboard.style.display = "none";
  backgroundCover.style.backgroundImage = 'url("img/background.jpg")';
});

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const getData = async (url) => {
  const response = await fetch(url);

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
