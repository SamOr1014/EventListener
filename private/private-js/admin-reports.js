async function loadAllReportsAdmin(){
    const reportsFromServer = await fetch('/admin/reports/details', {
        method: 'GET'
    })
    const reportsDetail = await reportsFromServer.json()
    console.log(reportsDetail);
    for (let report of reportsDetail){
        document.querySelector('#showing-panel').innerHTML = `<div class="col-md-3 report-cards">
        <div class="card">
          <div class="card-body">
            <h4>Report</h4>
            <p class="card-text">Event ID: ${report.event_id}</p>
            <p class="card-text">Reason: ${report.reason}</p>
            <a href="#" class="btn btn-primary">Deactive Event</a>
            <a href="#" class="btn btn-primary">Dismiss</a>
          </div>
        </div>
      </div>`
    }
}


loadAllReportsAdmin()



console.log('loading all users')
