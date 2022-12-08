
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
 const cityname=search.substring(6,search.length);
  // console.log("full city name --> "+search);
  // console.log("extracted city name --> "+cityname);
  return cityname;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  const adventuresList_API=config.backendEndpoint+"/adventures?city="+`${city}`;
  // console.log("API endpoint--> "+config.backendEndpoint+"/adventures?city="+`${city}`);
  try{
    const response = await fetch(adventuresList_API);
    const data = await response.json()
    // console.log(data);
    return data;
  }
  catch(err){
    console.log("Error : "+err);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  adventures.forEach((element)=>{

    const parentEle=document.getElementById('data');
    const childEle=document.createElement('div');
    childEle.setAttribute('class',"col-6 col-lg-3 mb-4 position-relative");

    childEle.innerHTML=`
        <a id=${element.id} target="_blank" href="detail/?adventure=${element.id}">
              <div class="category-banner mr-auto">${element.category}</div>
              <div class="activity-card">
                <img class="img-responsive" src=${element.image}/>
                <div class="activity-card-text text-md-center w-100 mt-3">
                  <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
                      <p class="text-left fw-bold">${element.name}</p>
                      <p>${element.currency} ${element.costPerHead}</p>
                  </div>
                  <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
                      <p class="text-left fw-bold">Duration</p>  
                      <p>${element.duration} Hours</p>
                  </div>
                </div>
              </div>
        </a>
      `;
    parentEle.appendChild(childEle);
  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let categoryFilteredList=[];
  
  list.forEach((element)=>{
    if(element.duration>=low && element.duration<=high){
      categoryFilteredList.push(element);
    }
  });

  console.log(categoryFilteredList);
  return categoryFilteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  const categoryFilteredList=[];

  for(let i=0;i<categoryList.length;i++){
    list.forEach((element)=>{
      if(element.category==categoryList[i]){
        categoryFilteredList.push(element);
      }
    })
  }
  return categoryFilteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log("filters list category or duration....");
  console.log(filters);
  let filteredList=[];
  if(filters.category.length>0 && filters.duration!=""){
    filteredList=[];
    // console.log("BOth filters applie....");
    let filter1=filterByCategory(list, filters.category);
    let durationArray=filters.duration.split("-");
    let filter2=filterByDuration(list, durationArray[0],durationArray[1]);

    for(let i=0;i<filter1.length;i++){
      for(let j=0;j<filter2.length;j++){
        if(filter1[i].id==filter2[j].id){
          filteredList.push(filter2[j]);
        }
      }
    }
    return filteredList;
  }

  // console.log(filters);
  // console.log(filters.category);

  if(filters.category.length>0){
    filteredList = filterByCategory(list, filters.category);
    return filteredList;
  }

  if (filters.duration!=""){
    let durationArray=filters.duration.split("-");
    filteredList = filterByDuration(list, durationArray[0],durationArray[1]);
    console.log(filteredList);
    return filteredList;
  }

  return list;
  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem('filters', JSON.stringify(filters));

  // let isCategoryEmpty=localStorage.getItem('category');
  // if(isCategoryEmpty==null){
  //   localStorage.setItem('category', JSON.stringify([]));
  // }
  // let getCategoryLcl;
  // filters.forEach((element)=>{
  //   localStorage.setItem('duration', JSON.stringify(element.duration));
  //   getCategoryLcl=JSON.parse(localStorage.getItem('category'));
  //   const found = getCategoryLcl.find(arrEle => arrEle == element.category);
  //   if(found==undefined){
  //     getCategoryLcl.push(element.category);
  //     localStorage.setItem('category', JSON.stringify(getCategoryLcl));
  //   }
    
  //   // let categoryOrig=JSON.parse(localStorage.getItem('category'));
  // })
  // console.log(JSON.parse(localStorage.getItem('lclStorageFilters')));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  console.log("----getFiltersFromLocalStorage()----");
  let lclStorageFilters;
  lclStorageFilters=JSON.parse(localStorage.getItem('filters'));
  // try{
  //   lclStorageFilters={
  //     duration : JSON.stringify(localStorage.getItem('duration')),
  //     category : JSON.parse(localStorage.getItem('category'))
  //   };
  // }
  // catch(err){
  //   console.log("ERROR ----> "+err);
  // }
  // // Place holder for functionality to work in the Stubs
  // console.log(lclStorageFilters);
  // if(lclStorageFilters.duration=='null' || lclStorageFilters.category==null){
  //   return null;
  // }
  return lclStorageFilters;
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  const parentEle=document.getElementById('category-list');
  const divEle=document.createElement('div');

  filters.category.forEach((element)=>{
    const childEle=document.createElement('button');
    childEle.setAttribute('class','category-filter');
    childEle.innerHTML=element;
    divEle.append(childEle);
  });
  parentEle.append(divEle);

  if(filters.duration!=""){
    const childEle=document.createElement('button');
    childEle.setAttribute('class','category-filter');
    childEle.textContent=filters.duration;
    parentEle.append(childEle);
  }
  console.log("-------------------------");
  console.log(document.getElementById("category-list").children.length);
}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
