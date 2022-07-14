async function loadAllReportsAdmin() {
  document.querySelector("#showing-panel").innerHTML = ``
  const reportsFromServer = await fetch("/admin/reports/details", {
    method: "GET",
  })
  const reportsDetail = await reportsFromServer.json()
  document.querySelector("#showing-panel").innerHTML += `<div id="title" class="text-center">REPORTS</div>`
  for (let report of reportsDetail) {
    document.querySelector(
      "#showing-panel"
    ).innerHTML += `<div class="col-md-4 mb-2 mt-2 report-cards">
        <div class="card">
          <div class="card-body">
            <h4>Report Number: ${report.id}</h4>
            <p class="card-text">Reporter ID: ${report.user_id}</p>
            <p class="card-text">Event ID: ${report.event_id}</p>
            <p class="card-text">Reason: ${report.reason}</p>
            <a href="#" eventname="${report.event_id}" class="btn btn-primary deactive-btn m-1">Stop Event ${report.event_id}</a>
            <a name="${report.id}" class="btn btn-primary dismiss-btn m-1">Dismiss</a>
          </div>
        </div>
      </div>`
  }
  addEventListenerToDismissAndDeactive()
}

async function addEventListenerToDismissAndDeactive() {
  //Directly deactive the event and once the event is deactvated all report of that even will not be displayed in this panel and marked as solved
  document.querySelectorAll(".deactive-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      let eventToDeactivate = e.target.attributes["eventname"].value
      //set event inactive
      await fetch(`/admin/events/inactivestatus?eventid=${eventToDeactivate}`, {
        method: "PUT",
      })
      //solve every event that was deactivated from last fetch
      await fetch(`/admin/reports/solvedeactiveevent?eventid=${eventToDeactivate}`, {
        method: "PUT",
      })

      loadAllReportsAdmin()
    })
  })

  //Dismiss the report and mark it as solved in database
  document.querySelectorAll(".dismiss-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      console.log("reportID", e.target.name)
      const dismissResult = await fetch(`/admin/reports/solved?reportid=${e.target.name}`, {
        method: "PUT",
      })
      loadAllReportsAdmin()
    })
  })
}

loadAllReportsAdmin()
