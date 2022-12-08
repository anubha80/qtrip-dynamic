import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  // console.log(config.backendEndpoint+"/cities");
  //Updates the DOM with the cities

  console.log(cities);


  //Updates the DOM with the cities

  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data


  const cities_API=config.backendEndpoint+"/cities";
  try {
    const response = await fetch (cities_API);
    const data= await response.json();
    return data;
  } catch(err) {
    console.log("ERROR : "+err);
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM


  const parentEle=document.getElementById('data');
  const childEle=document.createElement('div');
  childEle.setAttribute('class','col-6 col-xl-3 col-lg-3 col-sm-6 mt-3');


  childEle.innerHTML=`
      <a id=${id} target="_blank" href="pages/adventures/?city=${id}">
        <div class="tile">
          <img src=${image} alt=${city}>
          <p class="tile-text">${city} <br> ${description}</p>
        </div>
      </a>
  `;
  parentEle.appendChild(childEle);

}

export { init, fetchCities, addCityToDOM };
