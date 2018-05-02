var mykey = config.MY_KEY;

$(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition); 
  }
});

function getPosition(position) {
   var lat = position.coords.latitude;
   var long = position.coords.longitude;
   // var urlApi = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
   var urlApi = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid="+ mykey;

   
   // $("#data").html("latitude: " + lat + "<br>longitude: " + long);
  $.getJSON(urlApi, displayWeather);
       
}

function displayWeather(data) {
  console.log(data);
  var degSym = '°';
  var tempScale = 'F';
  var weather = data.weather[0].description;
  // var wind = data.wind.speed;
  var city = data.name;
  var country = data.sys.country;
  var currentTemp = data.main.temp;

  var getIcon = data.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + getIcon + ".png";
  $(".icon").html("<img src='" + iconUrl  + "'>");

  // $("#description").html(weather + '<br>' +"wind: " + wind + " mph");
  $("#city").text(city + ', ' + country); 
  $("#temperature").html(kelvinToFahrenheit(currentTemp) + ' °F');
  $("button").text("to ºC");

  $("button").click(function() {

   if (tempScale === "F") {
     $("#temperature").text(kelvinToCelsius(currentTemp) + " " + degSym +  "C");
     $("button").text("to ºF");
    tempScale = "C";
    } else {
     $("#temperature").text(kelvinToFahrenheit(currentTemp) + " " + degSym  + "F");
     $("button").text("to ºC");
     tempScale = "F";
    } 
  });
} 

function kelvinToFahrenheit(t) {
  return Math.floor((t - 273.15) * 1.8) + 32;
}

function kelvinToCelsius(t) {
  return Math.floor(t - 273.15);
}




