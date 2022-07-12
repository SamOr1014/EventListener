window.onload = async () => {
  const eventid = window.location.search.substr(9)
  console.log(eventid)
  await CheckLogin()
  await loadEventDetails(eventid)
  await userProfileInEventDetails(eventid)
}

async function loadEventDetails(eventid) {
  console.log("fetching")
  const resp = await fetch(`/event/singleEvent?eventid=${eventid}`)
  const events = await resp.json()
  console.log("event:", events)
  // console.log("event[0]:", events[0])
  let htmlStr = ""
  if (events.fee === 0) {
    Amount = "Free"
  } else {
    Amount = `HKD${events.fee}`
  }
  if (events.type === "Sport") {
    defaulePath = "sports.jpg"
  } else if (events.type === "Board_game") {
    defaulePath = "board-game.jpg"
  } else if (events.type === "Water_activity") {
    defaulePath = "water.jpg"
  } else if (events.type === "Gaming") {
    defaulePath = "gambling.jpg"
  } else if (events.type === "Party") {
    defaulePath = "party.jpg"
  } else if (events.type === "Workshop") {
    defaulePath = "workshop.jpg"
  } else if (events.type === "Online_activity") {
    defaulePath = "online.jpg"
  } else {
    defaulePath = "others.jpg"
  }

  const image = events.image ? `/${events.image}` : `/${defaulePath}`

  htmlStr += /*html */ `
  <div id="event-left">
   <img src="${image}" width="100%" alt="..." />
    <div class="event-detailsInfo">
     <div class="event-name">Event Name: ${events.name}</div>
       <div id="event-content-text">
         <div class="time">Time:${events.date}</div>
         <ul>
         <li></li>
         </ul>
         <div class="venue">Venue:${events.venue}</div>
         <ul>
         <li></li>
         </ul>
         <div class="fee">Fee:${Amount}</div>
         <ul>
         <li></li>
         </ul>
         <div class="max-pp">Max-participants:${events.max_participant}</div>
         <ul>
         <li></li>
         </ul>
         <div class="description">Description: ${events.bio}</div>
      </div>
    </div>
  </div>`
  document.querySelector("#event-details").innerHTML = htmlStr
}

async function userProfileInEventDetails(eventid) {
  let htmlProfileCard = document.querySelector("#Profile")
  const profile = await fetch(`/event/organiser?eventid=${eventid}`)
  // const profile = await fetch(`/account/userdetail`, {
  //   method: "GET",
  // })
  const userInfo = await profile.json()
  console.log(userInfo)
  let image = userInfo.profile_img ? userInfo.profile_img : "/profile-pic.jpg"
  // htmlProfileCard.innerHTML = ""
  htmlProfileCard.innerHTML = `
  <a href="#">
    <img
      src="${image}"
      class="card-img-top w-100 rounded-circle"
      alt="..."
    />
  </a>
  <div class="card-body">
    <div><h5 class="card-title">Name:${userInfo.first_name + " " + userInfo.last_name}</h5></div>
    <p class="card-text">Contact:${userInfo.phone}</p>
    <p class="card-text">Email : ${userInfo.email}</p>
    <p class="card-text">Bio : ${userInfo.bio}</p>
  </div>
`
  // console.log(htmlProfileCard)
}
// check login or not
async function CheckLogin() {
  const resp = await fetch("/createEvent/check")
  const result = await resp.json()
  if (result.success) {
    checkAppied()
  } else {
    needTologin()
  }
}
// check if not login and click apply button
async function needTologin() {
  document.querySelector("#apply-now").addEventListener("click", async function (event) {
    window.location.href = "/signup.html"
    alert("please sign in first!")
  })
}

async function checkAppiedStatus() {
  const eventid = window.location.search.substr(9)
  const resp = await fetch(`/event/checkAppliedStatus?eventid=${eventid}`)
  const applyStatus = await resp.json()
  console.log(applyStatus)
}

async function checkAppied() {
  const eventid = window.location.search.substr(9)
  const resp = await fetch(`/event/checkApply?eventid=${eventid}`)
  const applyStatus = await resp.json()
  // have ac and applied
  if (applyStatus.success) {
    // checkAppiedStatus()
    checkAppiedStatus()
  } else {
    // have ac and not applied
    document.querySelector("#apply-now").addEventListener("click", async function (event) {
      event.preventDefault()
      const eventid = window.location.search.substr(9)
      const response = await fetch(`/event/applyButton?eventid=${eventid}`, {
        method: "POST",
      })
      const result = await response.json()
      if (result.success) {
        alert("Joined")
      } else {
        alert("fail")
      }
    })
  }
}
// check applied status
// async function checkAppiedStatus() {
//   const eventid = window.location.search.substr(9)
//   const resp = await fetch(`/event/checkAppliedStatus?eventid=${eventid}`)
//   const applyStatus = await resp.json()
// }

let reportMsg = ""

function promptEvent() {
  reportMsg = prompt("May i have the Reasons?")
  if (reportMsg == null || reportMsg == "") {
    alert("Sorry, I haven't get your msg")
  } else {
    alert("Your have reported!")
  }
  console.log(reportMsg)
}
