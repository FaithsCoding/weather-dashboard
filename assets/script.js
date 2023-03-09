var inputCity = document.getElementById("myInput").value;
const cityRequest = inputCity;
var countryCode = "US";
var cityName = $("<h3>");
var temp = $("<div>");
var wind = $("<div>");
var humidity = $("<div>");
var uvIndex = $("<div>");
var icon = $("<img>");
icon.addClass("icon");
var dateTime = $("<div>");
var data;
var listGroup = $("<div>");

$(".city").addClass(listGroup);
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
};

fetch(findUrl) {
var findApiUrl = "https://api.openweathermap.org/data/2.5/find?q=" + inputCity + "&appid=da651d05e4f8445435fe5d5570543601";
  .then(response => response.json())
  .then(data => {
    const geoLat = data.list[0].id;
    const geoLon = data.list[0].id;
  })
  .catch(error => console.log(error));
}

fetch(apiUrl)
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=&appid=da651d05e4f8445435fe5d5570543601";
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    if (data.coord) {
      geoLat = data.coord.lat;
      geoLon = data.coord.lon;
  

      var weather = data.current.weather;
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
        uvi.attr(
          "style",
          "background-color:green; color:black; margin-left: 5px"
        );
      } else if (data.current.uvi < 6) {
        uvi.attr(
          "style",
          "background-color:yellow; color:black; margin-left: 5px"
        );
      } else if (data.current.uvi < 8) {
        uvi.attr(
          "style",
          "background-color:orange; color:black; margin-left: 5px"
        );
      } else if (data.current.uvi < 11) {
        uvi.attr(
          "style",
          "background-color:red; color:black; margin-left: 5px"
        );
      } else {
        uvi.attr(
          "style",
          "background-color:purple; color:black; margin-left: 5px"
        );
      }

      var fiveDay = $(".five-day");
      fiveDay.empty();

      for (var i = 1; i < 6; i++) {
        var blueContainer = $("<div>").addClass("weather-card");
        var futureDate = $("<h>").text(
          new Date(data.daily[i].dt * 1000)
            .toLocaleDateString()
            .replace(/\//g, "-")
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

        blueContainer.append(
          futureDate,
          futureIcon,
          futureTemp,
          futureHumidity
        );
        fiveDay.append(blueContainer);
      }
    } else {
      console.error("Data is empty");
    }
  });

function getInfo() {
 // Get the list of cities from local storage
const cityList = getInfo();

// Loop through the city list and create a list item element for each city
for (let i = 0; i < cityList.length; i++) {
  const city = cityList[i];
  const listItem = $("<li>").text(city);

  // Add an event listener to the list item to get the weather data of the clicked city
  listItem.on("click", function() {
    getWeatherData(city);
  });

  // Append the list item to the unordered list element
  $(".cityList").append(listItem);
}
}

function addInfo(n) {
  var cityCode = inputCity;
  var addedList = getInfo();
  if (addedList.includes(n) === false) {
    addedList.push(n);
  }
  localStorage.setItem("city", JSON.stringify(addedList));
}

document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener("click", getResult);

function getResult() {
  $(".five-day").empty();
  $(".city").empty();
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
