async function loadAllEventAdmin(){
    const eventsFromServer = await fetch('/event/allEvents', {
        method: 'GET'
    })
    const eventsDetail = await eventsFromServer.json()
    console.log(eventsDetail);
    for (let event of eventsDetail){
        document.querySelector('#showing-panel').innerHTML = `          <div class="col-md-3 report-cards">
        <div eventid="${event.id}" class="card">
          <div class="card-body">
            <h4>${event.name}</h4>
            <p class="card-text">Event ID : ${event.id}</p>
            <p class="card-text">Venue: ${event.venue}</p>
            <p class="card-text">Organiser ID: ${event.organiser_id}</p>
            <button class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div> `
    }
}


loadAllEventAdmin()



console.log('loading all event')

