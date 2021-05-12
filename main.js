// Get API key By Login to api.weatherbit.io 
// From Google Map => Tbilisi,Georgia taking lat and lon 
const baseURL = "https://api.weatherbit.io/v2.0/current?";
const APIKey = "eb1bce95e30645efacbf3bdf7faf1844";
const countryCode = "GE";
let filteredCities = [];

// Create array with cities
const cities = ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Gori", "Zugdidi",
  "Poti", "Kobuleti", "Khashuri", "Samtredia", "Senaki", "Zestafoni",
  "Marneuli", "Telavi", "Akhaltsikhe", "Ozurgeti", "Kaspi", "Chiatura",
  "Tsqaltubo", "Sagarejo", "Gardabani", "Borjomi", "Tkibuli", "Khoni",
  "Bolnisi", "Akhalkalaki", "Gurjaani", "Mtskheta", "Kvareli", "Akhmeta",
  "Kareli", "Lanchkhuti", "Tsalenjikha", "Dusheti", "Sachkhere", "Dedoplistsqaro",
  "Lagodekhi", "Ninotsminda", "Abasha", "Tsnori", "Terjola", "Martvili",
  "Jvari", "Khobi", "Vani", "Baghdati", "Vale", "Tetritsqaro",
  "Tsalka", "Dmanisi", "Oni", "Ambrolauri", "Sighnaghi", "Tsageri"
];
console.log(`This is my cities`, cities);
//&city=Raleigh&country=US
// Creating own TBILISI URL 
const URL = (city) => {
  return `${baseURL}city=${city}&country=${countryCode}&key=${APIKey}`;
}

//Draw the result in the DOM, temperature and the image using a new



const searchBox = document.querySelector(".search-box");
const resultsBox = document.querySelector(".resultsBox");
searchBox.addEventListener("keyup", setQuery);

// const filtredCities = cities.filter((city) => city.toLowerCase().indexOf(setQuery) !== -1
// )
// const filtredCities = cities.filter((city) => {
//   return city.toLowerCase() !== -1;
// })

function filterCities(search) {
  resultsBox.innerHTML = ""; // deleting space for my <li>

  if (search) {
    filteredCities = cities.filter((city) => city.toLowerCase().startsWith(search));

    if (filteredCities.length) {
      filteredCities.forEach((city) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        li.innerText = city;
        a.setAttribute("href", "#");
        li.onclick = () => {
          getResults(city);
        }
        li.appendChild(a);
        resultsBox.appendChild(li);
      })
    }
  }
}

function setQuery(event) {
  filterCities(searchBox.value);

  if (event.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(city) {
  console.log("CALLED", city)
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
  const date = document.querySelector(".location .date");
  date.innerText = new Date().toLocaleDateString(); // shows current date
  temp.innerText = `${weather.data[0].temp.toFixed()}°C`;
  city.innerText = `${weather.data[0].city_name},${weather.data[0].country_code}`;
  description.innerText = `${weather.data[0].weather.description}`;
}



