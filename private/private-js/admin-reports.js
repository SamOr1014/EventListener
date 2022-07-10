async function loadAllReportsAdmin() {
  document.querySelector("#showing-panel").innerHTML= ``
  const reportsFromServer = await fetch("/admin/reports/details", {
    method: "GET",
  });
  const reportsDetail = await reportsFromServer.json();
  console.log(reportsDetail);
  for (let report of reportsDetail) {
    document.querySelector("#showing-panel").innerHTML += `<div class="col-md-3 report-cards">
        <div class="card">
          <div class="card-body">
            <h4>Report</h4>
            <p class="card-text">Reporter ID: ${report.user_id}</p>
            <p class="card-text">Event ID: ${report.event_id}</p>
            <p class="card-text">Reason: ${report.reason}</p>
            <a href="#" eventname="${report.event_id}" class="btn btn-primary deactive-btn">Stop Event</a>
            <a name="${report.id}" class="btn btn-primary dismiss-btn">Dismiss</a>
          </div>
        </div>
      </div>`;
  }
  addEventListenerToDismissAndDeactive()
}

async function addEventListenerToDismissAndDeactive(){

  //Directly deactive the event and p
  document.querySelectorAll(".deactive-btn").forEach((button)=> {
    button.addEventListener('click', async (e)=> {
      console.log(e.target.attributes['eventname'].value)
      let eventToDeactivate = e.target.attributes['eventname'].value
      await fetch()
    })
  })


  //Dismiss the report and mark it as solved in database
  document.querySelectorAll(".dismiss-btn").forEach((button)=> {
    button.addEventListener('click',async (e)=>{
      console.log('reportID',e.target.name)
      const dismissResult = await fetch(`/admin/reports/solved?reportid=${e.target.name}`, {
        method: 'PUT'
      })
      loadAllReportsAdmin()
    })
  })
}

loadAllReportsAdmin();

console.log("loading all users");
