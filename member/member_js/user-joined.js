async function loadJoinedEvent() {
  const createdEventFromServer = await fetch("/event/joinedEvent")
  const allCreatedEvent = await createdEventFromServer.json()
  document.querySelector(
    "#content"
  ).innerHTML = `<div class="text-center mt-3"><h3>THE EVENTS YOU JOINED</h3></div>`
  for (let event of allCreatedEvent) {
    const realBDay = new Date(event.date)
    const finalDate =
      realBDay.getFullYear().toString() +
      "-" +
      (realBDay.getMonth() + 1).toString() +
      "-" +
      realBDay.getDate().toString()

    let image = event.image ? event.image : "water.jpg"
    document.querySelector(
      "#content"
    ).innerHTML += `<div id="account-panel" class="container-fluid d-flex mt-4 flex-column justify-content-center align-content-center">
    <div id="joined-event-col" class="col-lg-12 d-flex flex-wrap justify-content-around">
      <div class="col-md-12"><h3>${event.name}</h3></div>
      <div class="col-md-8 p-2">
          <img src="${image}" class="w-100 h-100">
      </div>
      
      <div class="col-md-4 p-2">
          <div><h4>Venue: </h4></div>
          <div><h5>@ ${event.venue}</h5></div>
          <div><h5>on ${finalDate}</h5></div>
          <div class="col-md-4 p-2 w-100">
              <div><h5>Event Bio:</h5></div>
              <div id="bio-text">${event.bio}</div>
          </div>
      </div>
    </div>
  </div>
</div>
</div>`
  }
}

loadJoinedEvent()
console.log("created event generating")
