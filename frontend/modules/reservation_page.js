import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const url=config.backendEndpoint+"/reservations/"
    console.log(url);
    const response = await fetch(url);
    const jsonData= await response.json();
    console.log(jsonData);
    return jsonData;
  }
  catch(err){
    console.log("ERROR : "+err);
    return null;
  }
  

  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  if(reservations.length==0){
    document.getElementById('no-reservation-banner').style.display='block';
    document.getElementById("reservation-table-parent").style.display='none';
  }
  else{
    document.getElementById('no-reservation-banner').style.display='none';
    document.getElementById("reservation-table-parent").style.display='block';
  }
  const tableBody=document.getElementById('reservation-table');
  

  for(let i=0;i<reservations.length;i++){
    // date format here
    let dateBefore=reservations[i].date;
    console.log(dateBefore);
    let day=dateBefore.substring(8,10);
    if(day[0]=='0'){
      day=day[1];
    }
    let month=dateBefore.substring(5,7);
    if(month[0]=='0'){
      month=month[1];
    }
    let year=dateBefore.substring(0,4);
    let dateAfter=day+"/"+month+"/"+year;

    // end of date format

    // booking time format
    const options1 = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    let bookingDate1=new Date(reservations[i].time);
    bookingDate1=bookingDate1.toLocaleString('en-IN',options1);
    const options2 = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    let bookingDate2=new Date(reservations[i].time);
    bookingDate2=bookingDate2.toLocaleString('en-IN',options2);
    let finalBookingTime=bookingDate1+", "+bookingDate2
    // end of booking time format

    const tr = document.createElement('tr');
    tableBody.appendChild(tr);

    let adventureURL=`http://127.0.0.1:8081/frontend/pages/adventures/detail/?adventure=${reservations[i].adventure}`;

    const tableRow=`
        <td>${reservations[i].id}</td>
        <td>${reservations[i].name}</td>
        <td>${reservations[i].adventureName}</td>
        <td>${reservations[i].person}</td>
        <td>${dateAfter}</td>
        <td>${reservations[i].price}</td>
        <td>${finalBookingTime}</td>
        <td id="${reservations[i].id}"><a class="reservation-visit-button" target="_blank" href=${adventureURL}>Visit Adventure</a></td>
    `
    tr.innerHTML=tableRow;
    // console.log(document.getElementById(reservations[i].id).children[0].href);
    // console.log(document.getElementById("reservation-table").children[i].children[4].innerHTML);
  } //end of for looop
 
}

export { fetchReservations, addReservationToTable };
