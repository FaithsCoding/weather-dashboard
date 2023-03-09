var inputCity = document.getElementById("myInput").value;
var countryCode = "US";
var cityCode = inputCity;
var apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityCode +
  "," +
  countryCode +
  "&appid=da651d05e4f8445435fe5d5570543601&units=metric";

var geoLon;
var geoLat;

var cityName = $("<h3>");
var temp = $("<div>");
var wind = $("<div>");
var humidity = $("<div>");
var uvIndex = $("<div>");
var icon = $("<img>");
icon.addClass("icon");
var dateTime = $("<div>");
var data;

$(".city").addClass("list-group");
$(".city").append(cityName);
$(".city").append(dateTime);
$(".city").append(icon);
$(".city").append(temp);
$(".city").append(wind);
$(".city").append(humidity);
$(".city").append(uvIndex);

document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener("click", getResult);

function getResult() {
  $(".five-day").empty();
  $(".city").empty();
}

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    if (data.coord) {
      geoLon = data.coord.lon;
      geoLat = data.coord.lat;
    } else {
      console.error("Data is empty");
    }
  })
  .catch(function (error) {
    console.error(error);
  });
var weatherIcon = data.current.weather[0].icon;
var imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
var icon = $("#weather-icon");
icon.attr("src", imgSrc);

var cityName = $("#city-name");
cityName.text(cityCode);

var date = new Date(data.current.dt * 1000);
var dateTime = $("#date-time");
dateTime.text(
  "(" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    ")"
);

var temp = $("#temperature");
temp.text("Temperature: " + data.current.temp + " F");

var humidity = $("#humidity");
humidity.text("Humidity: " + data.current.humidity + " %");

var wind = $("#wind-speed");
wind.text("Wind Speed: " + data.current.wind_speed + " MPH");

var uvIndex = $("#uv-index");
uvIndex.text("UV Index: ");
var uvi = $("<div>");
uvi.text(data.current.uvi);
uvIndex.append(uvi);
uvIndex.addClass("d-flex");

if (data.current.uvi < 3) {
  uvi.attr("style", "background-color:green; color:black; margin-left: 5px");
} else if (data.current.uvi < 6) {
  uvi.attr("style", "background-color:yellow; color:black; margin-left: 5px");
} else if (data.current.uvi < 8) {
  uvi.attr("style", "background-color:orange; color:black; margin-left: 5px");
} else if (data.current.uvi < 11) {
  uvi.attr("style", "background-color:red; color:black; margin-left: 5px");
} else {
  uvi.attr("style", "background-color:purple; color:black; margin-left: 5px");
}

var fiveDay = $(".five-day");
fiveDay.empty();

for (var i = 1; i < 6; i++) {
  var blueContainer = $("<div>").addClass("weather-card");
  var futureDate = $("<h>").text(
    new Date(data.daily[i].dt * 1000).toLocaleDateString().replace(/\//g, "-")
  );
  var futureIcon = $("<img>").attr(
    "src",
    "https://openweathermap.org/img/wn/" +
      data.daily[i].weather[0].icon +
      ".png"
  );
  var futureTemp = $("<div>").text(
    "Temperature: " + data.daily[i].temp.day + "C"
  );
  var futureHumidity = $("<div>").text(
    "Humidity: " + data.daily[i].humidity + " %"
  );

  blueContainer.append(futureDate, futureIcon, futureTemp, futureHumidity);
  var futureDate = $("<h>").text(
    new Date(data.daily[i].dt * 1000).toLocaleDateString().replace(/\//g, "-")
  );
  var futureIcon = $("<img>").attr(
    "src",
    "https://openweathermap.org/img/wn/" +
      data.daily[i].weather[0].icon +
      ".png"
  );
  var futureTemp = $("<div>").text("Temperature: " + data);
}

function getInfo() {
  var currentList = localStorage.getItem("city");
  if (currentList !== null) {
    freshList = JSON.parse(currentList);
  } else {
    freshList = [];
  }
  return freshList;
}

function addInfo(n) {
  var addedList = getInfo();
  if (addedList.includes(n) === false) {
    addedList.push(n);
  }
  localStorage.setItem("city", JSON.stringify(addedList));
}

function addResult() {
  inputCity = document.getElementById("myInput").value;
  var searchCity = $("<div>");
  searchCity.attr("id", inputCity);
  searchCity.text(inputCity);
  searchCity.addClass("h4");
  $(".history").append(searchCity);
  addInfo(inputCity);
  $(".subtitle").attr("style", "display:inline");
}

$(".history").on("click", "div", function (event) {
  event.preventDefault();
  $(".subtitle").attr("style", "display:inline");
  document.getElementById("myInput").value = event.target.id;
  getResult();
});

function renderInfo() {
  var historyList = getInfo();
  for (var i = 0; i < historyList.length; i++) {
    var inputCity = historyList[i];
    var searchCity = $("<div>");
    searchCity.attr("id", inputCity);
    searchCity.text(inputCity);
    searchCity.addClass("h4");

    $(".history").append(searchCity);
  }
}

renderInfo();
