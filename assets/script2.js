document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener("click", getResult);

function getResult() {
  $(".five-day").empty();
  $(".city").empty();
}



     


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
