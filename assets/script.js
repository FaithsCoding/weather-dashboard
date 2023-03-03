fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY"
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

const temperature = data.main.temp;
const temperatureElement = document.createElement("div");
temperatureElement.innerHTML = `Temperature: ${temperature}°C`;
document.body.appendChild(temperatureElement);

const API_KEY = "da651d05e4f8445435fe5d5570543601";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${da651d05e4f8445435fe5d5570543601}&units=metric`;

$(document).ready(() => {
  $.ajax({
    url: API_URL,
    method: "GET",
    success: function (data) {
      console.log(data);
      updateUI(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
});

function updateUI(data) {
  $(".city").text(`${data.name}, ${data.sys.country}`);
  const date = dayjs().format("dddd, MMMM D, YYYY");
  $(".date").text(date);
  $(".temp").text(`${Math.round(data.main.temp)}°C`);
  $(".description").text(data.weather[0].description);
  const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  $(".icon").css("background-image", `url(${iconUrl})`);
}
