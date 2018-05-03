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

  $("#description").text(weather);
  $("#city").text(city + ', ' + country); 
  $("#temperature").html(kelvinToFahrenheit(currentTemp) + ' °F');
  $("#buttonId").text("to ºC");

  $("#buttonId").click(function() {

   if (tempScale === "F") {
     $("#temperature").text(kelvinToCelsius(currentTemp) + " " + degSym +  "C");
     $("#buttonId").text("to ºF");
    tempScale = "C";
    } else {
     $("#temperature").text(kelvinToFahrenheit(currentTemp) + " " + degSym  + "F");
     $("#buttonId").text("to ºC");
     tempScale = "F";
    } 
  });
  
  $("#back").text(imageCode(getIcon));
  $("#back").css("background-position", "cover");

} 

function kelvinToFahrenheit(t) {
  return Math.floor((t - 273.15) * 1.8) + 32;
}

function kelvinToCelsius(t) {
  return Math.floor(t - 273.15);
}

function imageCode(conditions) {
  
  switch (conditions) {
    case "01n":
    case "01d":    
      document.getElementById("back").style.backgroundImage = "url('clear.jpg')";
      break;
    case "02d":
    case "02n":
    case "03n":
    case "03d":
    case "04d":
    case "04n":
      document.getElementById("back").style.backgroundImage = "url('clouds.jpg')";
      break;
    case "09d":
    case "09n":
    case "10n":
    case "10d":
      document.getElementById("back").style.backgroundImage = "url('rain.jpg')";
      break;
    case "11d":
    case "11n":
      document.getElementById("back").style.backgroundImage = "url('thunderstorm.jpg')";
      break;
    case "13d":
    case "13n":
      document.getElementById("back").style.backgroundImage = "url('snow.jpg')";
      break;
    case "50d":
    case "50n":
      document.getElementById("back").style.backgroundImage = "url('mist.jpg')";
      break;
   }
}



