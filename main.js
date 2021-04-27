// Get API key By Login to api.weatherbit.io 
// From Google Map => Tbilisi,Georgia taking lat and lon 
const baseURL = "https://api.weatherbit.io/v2.0/current?";
const APIKey = "eb1bce95e30645efacbf3bdf7faf1844";
const countryCode = "GE";


//&city=Raleigh&country=US
// Creating own TB URL 
const URL = (city) => {
  return `${baseURL}city=${city}&country=${countryCode}&key=${APIKey}`;
}

//Draw the result in the DOM, temperature and the image using a new
// function named “render()” ???? IS IT REACT ALREADY?


const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(city) {
  fetch(URL(city))
    .then(weather => {
      return weather.json();
    }).then(renderResults)
    .catch((error) => {
      return alert(`There been an Error: ${error}`);
    })

}

function renderResults(weather) {
  console.log(weather);
  const city = document.querySelector(".location .city");
  const temp = document.querySelector(".temp")
  const description = document.querySelector(".weather");
  temp.innerText = `${weather.data[0].temp.toFixed()}°C`;
  city.innerText = `${weather.data[0].city_name},${weather.data[0].country_code}`;
  description.innerText = `${weather.data[0].weather.description}`;
}



