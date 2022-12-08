import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  return search.substring(11,search.length);
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  let adventureDetailsAPI=config.backendEndpoint+"/adventures/detail?adventure="+adventureId;
  console.log(adventureDetailsAPI);
  try{
    const response = await fetch(adventureDetailsAPI);
    const data = await response.json();
    return data;
  }
  catch(err){
    console.log("ERROR : "+err);
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  const advNameEl=document.getElementById('adventure-name');
  advNameEl.textContent=adventure.name;
  const advSubTitleEl=document.getElementById('adventure-subtitle');
  advSubTitleEl.textContent=adventure.subtitle;
  const advContentEl=document.getElementById('adventure-content');
  advContentEl.textContent=adventure.content;

  addBootstrapPhotoGallery(adventure.images);

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const advImgDiv=document.getElementById('photo-gallery');
  const newCarouselEl=document.createElement('div');

  newCarouselEl.innerHTML=
      
  `
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner" id="caraousel-main">
          
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
  `
  advImgDiv.appendChild(newCarouselEl);

  const getMainDivEl=document.getElementById('caraousel-main');

  for (let i=0;i<images.length;i++) {
    const newDivEl=document.createElement('div');
    if(i==0){
      newDivEl.setAttribute('class','active carousel-item');
    }
    else{
      newDivEl.setAttribute('class','carousel-item');
    }
    
    const imgCarousel=document.createElement('img');
    imgCarousel.setAttribute('class','activity-card-image');
    imgCarousel.src=images[i];
    newDivEl.appendChild(imgCarousel);
    getMainDivEl.appendChild(newDivEl);
  }
  // console.log(document.getElementsByClassName("activity-card-image").length);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  // console.log(adventure);
  if(adventure.available){
    document.getElementById('reservation-panel-sold-out').style.display='none';
    document.getElementById('reservation-panel-available').style.display='block';
  }
  else{
    document.getElementById('reservation-panel-sold-out').style.display='block';
    document.getElementById('reservation-panel-available').style.display='none';
  }
  let divCostPerHead=document.getElementById('reservation-person-cost');
  divCostPerHead.innerHTML=String(adventure.costPerHead);

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let divElTotal=document.getElementById('reservation-cost');
  let totalCost=adventure.costPerHead*persons;
  divElTotal.textContent=totalCost;
  
}



// ******
const makeRequest = async (postObject) => {
  const url = config.backendEndpoint+"/reservations/new";

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(postObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then((response) => {
    response.json();
  });
};
// ******

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  console.log(adventure);
  let form = document.getElementById('myForm');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id
    };
    console.log("test....form details");
    console.log(data);

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try{
      const response = await fetch(config.backendEndpoint+"/reservations/new", options);
      const jsonData = await response.json();
      console.log(jsonData);
      if(jsonData.success==true){
        alert("Success!");
        location.reload();
      }
      else{
        alert("Failure!");
      }
    }
    catch(err){
      console.log("ERROR : "+e);
    }
    
  }) //end of eventlistener 
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure.reserved);
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display='block';
  }
  else{
    document.getElementById('reserved-banner').style.display='none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
