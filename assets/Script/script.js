let todayDate = moment(Date.now()).format("(DD/M/YYYY)");
let inputBtn = document.getElementById("search-button");
let historyBtn = document.getElementById("history");
// let searchedHistoryArray =[];

let searchedHistoryArray = JSON.parse(localStorage.getItem("searchHistoryLocal")) || [];



render();


function displayData(citySearchedFor){
  
  let queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    citySearchedFor +
    "&units=metric&limit=5&appid=68947311d4542f9a4f9f15d64ada6b80";

  console.log("The city searched for is: " + citySearchedFor);

  fetch(queryURL)
    .then((response) => response.json())
    .then((citiesFound) => {
      let city = citiesFound[0];

      console.log(city.lat);
      console.log(city.lon);

      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=68947311d4542f9a4f9f15d64ada6b80`
      );
    })

    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      console.log("Weather: " + response.list[0].weather[0].description);
      let todayIcon = response.list[0].weather[0].icon;
      let todayTemp = response.list[0].main.temp;
      let todayWindSpeed = response.list[0].wind.speed;
      let todayHumidity = response.list[0].main.humidity;
      let todayIconURL = `https://openweathermap.org/img/wn/${todayIcon}@2x.png`;
      let todayIconImage = $("<img>");
      todayIconImage.attr("src", todayIconURL);

      let tp1 = $("<p>")
        .text(citySearchedFor + " " + todayDate)
        .attr("id", "todayCity");
      let tp2 = $("<p>")
        .text("Temp: " + todayTemp + " °F")
        .attr("id", "todayText");
      let tp3 = $("<p>")
        .text("Wind: " + todayWindSpeed + " MPH")
        .attr("id", "todayText");
      let tp4 = $("<p>")
        .text("Humidity: " + todayHumidity + "%")
        .attr("id", "todayText");

      $("#today").append(tp1);
      $("#today").append(tp2);
      $("#today").append(tp3);
      $("#today").append(tp4);
      $("#todayCity").append(todayIconImage);

      for (i = -1; i < 40; i = i + 8) {
        if (i > 0) {
       

          let timestamp = response.list[i].dt;
          let forecastTempt = response.list[i].main.temp;
          let forecastWindSpeed = response.list[i].wind.speed;
          let forecastHumidity = response.list[i].main.humidity;
          let forecastIcon = response.list[i].weather[0].icon;
          let iconUrl = `https://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
          let newDiv = $("<div>");
          newDiv.attr("class", "card-body");

          let forecastIconImage = $("<img>");
          forecastIconImage.attr("src", iconUrl);

          weathDateConverted = moment.unix(timestamp).format("D/M/YYYY");

          let pDate = $("<p>")
            .text(weathDateConverted)
            .attr("id", "card-heading");
          let p1 = $("<p>").text("Temp: " + forecastTempt + " °F");
          let p2 = $("<p>").text("Wind: " + forecastWindSpeed + " MPH");
          let p3 = $("<p>").text("Humidity: " + forecastHumidity + "%");
          newDiv.append(pDate);
          newDiv.append(forecastIconImage);
          newDiv.append(p1);
          newDiv.append(p2);
          newDiv.append(p3);

          $("#forecast").append(newDiv);

      

          console.log("i is: " + i);
          console.log("Timestamp: " + timestamp);
          console.log("Converted: " + weathDateConverted);
        }
      }

      console.log("City : " + response.city.name);
      console.log("Weather: " + response.list[0].weather[0].description);
      console.log("Icon: " + response.list[0].weather[0].icon);
      console.log("Temp: " + response.list[0].main.temp);
      console.log("Humidity: " + response.list[0].main.humidity);
      console.log("Wind: " + response.list[0].wind.speed);
      console.log(todayTemp);
      console.log(todayIcon);
      console.log(todayHumidity);
      console.log(todayWindSpeed);
      console.log("Date " + todayDate);
    });
}


function render() {
  let searchedHistoryArray = JSON.parse(localStorage.getItem("searchHistoryLocal")) || [];
  document.getElementById("history").innerHTML="";
  if (searchedHistoryArray.length < 1) {

    for (i = 0; i < 6; i++) {
    let buttonText = "";

     let Btn2 = $("<button>").text(buttonText).attr("id", "newButton");
    $("#history").append(Btn2);

    }
  }  
    else { 
      
      for(i = 0; i < 6; i++) {
        let buttonText = searchedHistoryArray[i];
    
         let Btn2 = $("<button>").text(buttonText).attr("id", "newButton");
        $("#history").append(Btn2);

    }

  }

}



function saveCityHistory(citySearchedFor){

  if(searchedHistoryArray.length >5){
searchedHistoryArray.unshift([citySearchedFor]);
searchedHistoryArray.pop;

  } else{
    searchedHistoryArray.unshift([citySearchedFor]);
  }

  localStorage.setItem("searchHistoryLocal", JSON.stringify(searchedHistoryArray));

}





inputBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let citySearchedFor = document.getElementById("search-input").value;
  document.getElementById("today").innerHTML="";
  document.getElementById("forecast").innerHTML="";
  document.getElementById("search-form").reset();
saveCityHistory(citySearchedFor);
displayData(citySearchedFor);
render();
// render();

});

historyBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let citySearchedFor = event.target.innerHTML;

console.log("historyBtn: "+citySearchedFor)
  document.getElementById("today").innerHTML="";
  document.getElementById("forecast").innerHTML="";
  
saveCityHistory(citySearchedFor);
displayData(citySearchedFor);

// render();

});



console.log("END!!!");