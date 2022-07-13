function loadPage(result) {
  document.querySelector(
    "#showing-panel"
  ).innerHTML = `<div class="col-md-12 text-center" id="title">EVENTS PANEL</div>
    <div class="d-flex justify-content-center">
    <button id="show-active" class="btn btn-primary m-1">See Active</button>
    <button id="show-inactive" class="btn btn-primary m-1">See Inactive</button>
    <button id="show-deleted" class="btn btn-primary m-1">See Deleted</button>
    <\div>
`
  for (let event of result) {
    let delButton = event.is_deleted
      ? `<button eventname="${event.id}" class="m-1 btn btn-dark rev-btn">Revert</button>`
      : `    <button eventname="${event.id}" class="m-1 btn btn-danger del-btn">Delete</button>`

    let activeButton = event.is_active
      ? `<button eventname="${event.id}" class="m-1 btn btn-warning ina-btn">Inactivate</button>`
      : `<button eventname="${event.id}" class="m-1 btn btn-warning act-btn">Activate</button>`

    document.querySelector(
      "#showing-panel"
    ).innerHTML += `          <div class="col-md-4 report-cards">
        <div eventid="${event.id}" class="card">
          <div class="card-body">
            <h4>${event.name}</h4>
            <p class="card-text">Event ID : ${event.id}</p>
            <p class="card-text">Venue: ${event.venue}</p>
            <p class="card-text">Organiser ID: ${event.organiser_id}</p>
            <p><a href="/event-details.html?eventid=${event.id}" class="card-text">Link to the Event</a></p>
            <div class="d-flex justify-content-start ">${delButton}${activeButton}</div>
          </div>
        </div>
      </div> `
  }
  addEventListenerToDelEvent()
}

async function loadDeletedEventAdmin() {
  const deletedEvent = await fetch("/admin/allEvents/deletedEvents")
  const result = await deletedEvent.json()
  loadPage(result)
}

async function loadActiveEventAdmin() {
  const eventsFromServer = await fetch("/admin/allEvents/activeEvents", {
    method: "GET",
  })
  const eventsDetail = await eventsFromServer.json()
  loadPage(eventsDetail)
}

async function loadInactiveEventAdmin() {
  const eventsFromServer = await fetch("/admin/allEvents/inactiveEvents")
  const eventsDetail = await eventsFromServer.json()
  loadPage(eventsDetail)
}

async function addEventListenerToDelEvent() {
  //delete button
  document.querySelectorAll(".del-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      let eventToDelete = e.target.attributes["eventname"].value
      const deleteEvent = await fetch(`/admin//events/deletestatus?eventid=${eventToDelete}`, {
        method: "PUT",
      })
      loadActiveEventAdmin()
    })
  })
  //revert delete status
  document.querySelectorAll(".rev-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      let eventToDelete = e.target.attributes["eventname"].value
      const deleteEvent = await fetch(`/admin//events/deletestatus?eventid=${eventToDelete}`, {
        method: "PUT",
      })
      loadDeletedEventAdmin()
    })
  })

  //top three button
  document.querySelector("#show-deleted").addEventListener("click", async (e) => {
    loadDeletedEventAdmin()
  })
  document.querySelector("#show-inactive").addEventListener("click", async (e) => {
    loadInactiveEventAdmin()
  })
  document.querySelector("#show-active").addEventListener("click", (e) => {
    loadActiveEventAdmin()
  })
  //inactive the event
  document.querySelectorAll(".ina-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      console.log("clicked inactive")
      let eventToDeactivate = e.target.attributes["eventname"].value
      await fetch(`/admin/events/inactivestatus?eventid=${eventToDeactivate}`, {
        method: "PUT",
      })
      loadActiveEventAdmin()
    })
  })
  document.querySelectorAll(".act-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      console.log("clicked active")
      let eventToDeactivate = e.target.attributes["eventname"].value
      await fetch(`/admin/events/inactivestatus?eventid=${eventToDeactivate}`, {
        method: "PUT",
      })
      loadInactiveEventAdmin()
    })
  })
}

loadActiveEventAdmin()

console.log("loading all event")
