async function loadAllRequestOfJoiningEvent() {
  document.querySelector("#showing-panel").innerHTML = ``
  const userWhoReq = await fetch("/account/request/detail")
  const result = await userWhoReq.json()
  document.querySelector(
    "#showing-panel"
  ).innerHTML += `<div class="text-center mt-3"><h3>HERE ARE ALL THE REQUEST BY OTHER USERS</h3></div>`
  for (let request of result) {
    document.querySelector("#showing-panel").innerHTML += `<div class="col-md-3 report-cards">
        <div class="card m-1">
          <div class="card-body">
            <h4>Request ${request.id}</h4>
            <p class="card-text">Request User ID: ${request.user_id} </p>
            <p class="card-text">Request User Name: ${
              request.first_name + " " + request.last_name
            } </p>
            <p class="card-text">Requst User Phone: ${request.phone}</p>
            <p class="card-text">Event ID: ${request.event_id}</p>
            <p class="card-text">Event Name: ${request.name}</p>
            <a href="#" eid="${request.event_id}" ruid="${request.user_id}" reqid="${
      request.id
    }" id="approve" class="btn btn-primary">Approve</a>
            <a href="#" eid="${request.event_id}" ruid="${request.user_id}" reqid="${
      request.id
    }" id="dismiss" class="btn btn-danger">Dismiss</a>
          </div>
        </div>
      </div>`
  }
  addEventListenerToDismissAndApprove()
}

async function addEventListenerToDismissAndApprove() {
  document.querySelector("#approve").addEventListener("click", async (e) => {
    let eventid = e.target.attributes["eid"].value
    let reqUserid = e.target.attributes["ruid"].value
    let reqid = e.target.attributes["reqid"].value
    const approveFetch = await fetch(`/event/approve?approve=yes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventid,
        reqUserid,
        reqid,
      }),
    })
    alert((await approveFetch.json()).message)
    loadAllRequestOfJoiningEvent()
  })
  document.querySelector("#dismiss").addEventListener("click", async (e) => {
    let eventid = e.target.attributes["eid"].value
    let reqUserid = e.target.attributes["ruid"].value
    let reqid = e.target.attributes["reqid"].value
    const approveFetch = await fetch(`/event/approve?approve=no`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventid,
        reqUserid,
        reqid,
      }),
    })
    alert((await approveFetch.json()).message)
    loadAllRequestOfJoiningEvent()
  })
}

loadAllRequestOfJoiningEvent()
