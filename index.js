


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition); 
  }
}

function getPosition(position) {
   var lat = position.coords.latitude;
   var long = position.coords.longitude;
   var urlApi = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
   // $("#data").html("latitude: " + lat + "<br>longitude: " + long);
  $.getJSON(urlApi, displayWeather);

}

function displayWeather(data) {
  console.log(data);
  var weather = data.weather[0].description;
  var icon = data.weather[0].icon;
  console.log(weather);

  $("#description").html("weather: " + weather + "<br>icon: " + icon);


}

$(getLocation);

