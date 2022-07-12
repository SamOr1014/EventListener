//functions
async function loadUserProfile(){
    let htmlProfileCard = document.querySelector('#profile-info')
    const profile = await fetch(`/account/userdetail`, {
        method: 'GET'
    })
    const userInfo = await profile.json()
    console.log(userInfo)
    let image = userInfo.profile_img ? userInfo.profile_img: "/profile-pic.jpg"
    htmlProfileCard.innerHTML = ''
    htmlProfileCard.innerHTML += `            <img
    src="${image}"
    class="card-img-top w-100 rounded-circle"
    alt=""
  />
  <div class="card-body">
    <div><h5 id="profile-name" class="card-title">${userInfo.first_name+ " "+ userInfo.last_name}</h5></div>
    <div id="profile-birthday" class="card-text mb-2">Birthday :${userInfo.birthday}</div>
    <div id="profile-email" class="card-text mb-2">Email :${userInfo.email}</div>
    <div class="card-text mb-2">Bio :</div>
    <div id="profile-bio" class="card-text mb-2">${userInfo.bio}</div>
  </div>`
}

async function loadFollowers(){
    let htmlFollowersList = document.querySelector('#follower-list')
    const followers = await fetch(`/followers`, {
        method: 'GET'
    })
    const followersInfo = await followers.json()
    for (let followers of followersInfo){
      let fullName = followers.first_name + " " + followers.last_name
      htmlFollowersList.innerHTML += `<li>${fullName}</li>`
    }
}

async function loadUpComingEvent(){
  const joinedEventFromServer = await fetch('/event/joinedEvent/upcoming')
  const allJoinedEvent = await joinedEventFromServer.json()
  document.querySelector('#upcoming-event').innerHTML += `<div class="text-center"><h3>Upcoming Events</h3></div>`
  for(let event of allJoinedEvent ){
      let image = event.image? event.image: "water.jpg"
      const realBDay = new Date(event.date)
      const finalDate = realBDay.getFullYear().toString()+"-"+(realBDay.getMonth()+ 1).toString() +"-"+realBDay.getDate().toString()
  
      document.querySelector('#upcoming-event').innerHTML += `<div id="account-panel" class="container-fluid d-flex mt-4 flex-column justify-content-center align-content-center">
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

loadUserProfile()
loadUpComingEvent()
loadFollowers()