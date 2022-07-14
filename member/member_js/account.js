//functions
async function loadUserProfile() {
  let htmlProfileCard = document.querySelector("#profile-info")
  const profile = await fetch(`/account/userdetail`, {
    method: "GET",
  })
  const userInfo = await profile.json()
  console.log(userInfo)
  const realBDay = new Date(userInfo.birthday)
  const finalDate =
    realBDay.getFullYear().toString() +
    "-" +
    (realBDay.getMonth() + 1).toString() +
    "-" +
    realBDay.getDate().toString()
  let image = userInfo.profile_img ? "/" + userInfo.profile_img : "/profile-pic.jpg"
  if (userInfo.bio === null) {
    bio = "這人很懶，什麼也沒有"
  } else {
    bio = userInfo.bio
  }
  htmlProfileCard.innerHTML = ""
  htmlProfileCard.innerHTML += `            <img
    src="${image}"
    class="card-img-top w-100 rounded-circle"
    alt=""
  />
  <div class="card-body">
    <div><h5 id="profile-name" class="card-title">${
      userInfo.first_name + " " + userInfo.last_name
    }</h5></div>
    <div id="profile-birthday" class="card-text mb-2">Birthday :${finalDate}</div>
    <div id="profile-email" class="card-text mb-2">Email :${userInfo.email}</div>
    <div class="card-text mb-2">Bio :</div>
    <div id="profile-bio" class="card-text mb-2">${bio}</div>
  </div>`
}

async function loadFollowers() {
  let htmlFollowersList = document.querySelector("#follower-list")
  const followers = await fetch(`/followers`, {
    method: "GET",
  })
  const followersInfo = await followers.json()
  for (let followers of followersInfo) {
    let fullName = followers.first_name + " " + followers.last_name
    htmlFollowersList.innerHTML += `<li>${fullName}</li>`
  }
}

async function loadUpComingEvent() {
  const joinedEventFromServer = await fetch("/event/joinedEvent/upcoming")
  const allJoinedEvent = await joinedEventFromServer.json()
  document.querySelector(
    "#upcoming-event"
  ).innerHTML += `<div class="text-center"><h3>Upcoming Events</h3></div>`
  for (let event of allJoinedEvent) {
    if (event.type === "sport") {
      defaulePath = "sports.jpg"
    } else if (event.type === "board_game") {
      defaulePath = "board-game.jpg"
    } else if (event.type === "water_activity") {
      defaulePath = "water.jpg"
    } else if (event.type === "gambling") {
      defaulePath = "gambling.jpg"
    } else if (event.type === "party") {
      defaulePath = "party.jpg"
    } else if (event.type === "workshop") {
      defaulePath = "workshop.jpg"
    } else if (event.type === "online_activity") {
      defaulePath = "online.jpg"
    } else {
      defaulePath = "others.jpg"
    }
    const image = event.image ? `/${event.image}` : `/${defaulePath}`
    const realBDay = new Date(event.date)
    let year = realBDay.getFullYear().toString()
    let month = ("0" + (realBDay.getMonth() + 1).toString())
    let date = ("0" + realBDay.getDate().toString())
    let hour = ("0" +realBDay.getHours().toString())
    let mins = ("0" + realBDay.getMinutes().toString())
    const finalDate = year + "-" + month.substring(month.length-2) + "-" + date.substring(date.length-2)
    const finalTime = hour.substring(hour.length-2) + ":" + mins.substring(mins.length-2)
    
    document.querySelector(
      "#upcoming-event"
    ).innerHTML += `<div id="account-panel" class="container-fluid d-flex mt-4 flex-column justify-content-center align-content-center">
          <div id="joined-event-col" class="col-lg-12 d-flex flex-wrap justify-content-around">
            <div class="col-md-12 text-center"><h3>${event.name}</h3></div>
            <div class="col-md-8 p-2">
                <img src="${image}" class="w-100 h-100">
            </div>
            
            <div class="col-md-4 p-2">
            <a href="/event-details.html?eventid=${event.id}">Link</a>
                <div><h4>Venue: </h4></div>
                <div><h5>@ ${event.venue}</h5></div>
                <div><h4>Date: </h4></div>
                <div><h5>on ${finalDate}</h5></div>
                <div><h4>Time: </h4></div>
                <div><h5>at ${finalTime}</h5></div>
                <div><h4>Event Bio:</h4></div>
                <div class="col-md-4 w-100">
                    <div id="bio-text">${event.bio}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
  }
}

loadUserProfile()
loadUpComingEvent()
loadFollowers()
