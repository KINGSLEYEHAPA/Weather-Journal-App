goBtn = document.querySelector("#send");
const dashboard = document.querySelector(".dashboard");

goBtn.addEventListener("click", retrieveData);

async function retrieveData(e) {
  const zip = document.querySelector("#cityInput").value;
  const apiKey = "eebe977cc40a76610abf0f365528ca2d";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=${apiKey}&units=${unit}&zip=${zip}`;

  const newWeatherData = await getData(url);
  const weatherCondition = document.querySelector(".condition-info");
  const weatherConditionImage = document.querySelector(".condition img");
  const location = document.querySelector(".city p");
  const temp = document.querySelector(".temp-data");

  if (newWeatherData.cod === "404") {
    const error = document.querySelector(".error");
    error.textContent = newWeatherData.message;

    setTimeout(function () {
      error.textContent = "";
    }, 3000);
  }

  if (newWeatherData.main.temp > 25) {
    temp.style.color = "red";
  } else {
    temp.style.color = "blue";
  }
  temp.textContent = newWeatherData.main.temp + "°C";

  weatherCondition.textContent = newWeatherData.weather[0].description;
  const icon = newWeatherData.weather[0].icon;
  location.textContent = newWeatherData.name;
  const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  weatherConditionImage.src = imageUrl;

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

  const today = `${day} ${month} ${dateNumber}, ${year}. `;
  console.log(today);
  const dateSpan = document.querySelector(".date");
  dateSpan.textContent = today;
  const userMessage = document.querySelector(".user-message");
  const userInput = document.querySelector("#user-feeling").value;
  userMessage.textContent = userInput;

  const dashboard = document.querySelector(".dashboard");
  dashboard.style.display = "flex";
  document.querySelector("#cityInput").value = "";
  document.querySelector("#user-feeling").value = "";
}
const refresh = document.querySelector("#refresh");
refresh.addEventListener("click", () => {
  dashboard.style.display = "none";
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
