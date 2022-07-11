window.onload = () => {
  const eventid = window.location.search.substr(-1)
  console.log(parseInt(eventid))
  loadEventDetails(eventid)
}

async function loadEventDetails(eventid) {
  console.log("fetching")
  const resp = await fetch(`/event/singleEvent?eventid=${eventid}`)
  const events = await resp.json()
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
  } else if (events.type === "Gambling") {
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

  const image = events.image ? `/${events.image}` : `/{defaulePath}`
  htmlStr += /*html */ `
  <div id="event-left">
   <img src=${image}" width="100%" alt="..." />
    <div class="event-detailsInfo">
     <div class="event-name">Event Name: ${events.eventName}</div>
       <div id="event-content-text">
         <div class="time">Time:${events.time}</div>
         <ul>
         <li></li>
         </ul>
         <div class="venue">Venue:${events.venue}</div>
         <ul>
         <li></li>
         </ul>
         <div class="fee">Fee:${events.fee}</div>
         <ul>
         <li></li>
         </ul>
         <div class="max-pp">Max-participants:${events.numberOfPart}</div>
         <ul>
         <li></li>
         </ul>
         <div class="description">Description: ${events.content}</div>
      </div>
    </div>
  </div>`
  document.querySelector(".event-detailsInfo").innerHTML = htmlStr
}

document.querySelector("#apply-now").addEventListener("click", function (event) {
  event.preventDefault()
  console.log("hi")
})

async function userProfileInEventDetails() {
  let htmlProfileCard = document.querySelector("#Profile")
  const profile = await fetch(`/account/userdetail`, {
    method: "GET",
  })
  const userInfo = await profile.json()
  console.log(userInfo)
  let image = userInfo.profile_img ? userInfo.profile_img : "/profile-pic.jpg"
  htmlProfileCard.innerHTML = ""
  htmlProfileCard.innerHTML += `<div id="Profile" class="card w-50 mb-3">
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
</div>`
}

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
