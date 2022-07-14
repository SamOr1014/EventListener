window.onload = () => {
  const eventid = window.location.search.substr(9)
<<<<<<< HEAD
  console.log(eventid)
  CheckLoginNow()
=======
  CheckLogin()
>>>>>>> b72572c865f0a24fef7b3aa7b09461bdd04698a0
  loadEventDetails(eventid)
  userProfileInEventDetails(eventid)
  document.querySelector("#commentForm").addEventListener("submit", async function (event) {
    event.preventDefault()

    const eventID = window.location.search.substr(9)
    const form = event.target
    const comment = form.comment.value
    
    const res = await fetch("/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, eventID }),
    })

    const result = await res.json()
    if (result.success) {
      const eventid = window.location.search.substr(9)
      document.querySelector("#comment").value = ""
      loadComment(eventid)
    } else {
      document.querySelector("#comment").value = ""
      alert("Fail to comment")
    }
  })
  loadComment(eventid)
}

async function loadEventDetails(eventid) {
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
  } else if (events.type === "board_game") {
    defaulePath = "board-game.jpg"
  } else if (events.type === "water_activity") {
    defaulePath = "water.jpg"
  } else if (events.type === "gaming") {
    defaulePath = "gambling.jpg"
  } else if (events.type === "party") {
    defaulePath = "party.jpg"
  } else if (events.type === "workshop") {
    defaulePath = "workshop.jpg"
  } else if (events.type === "online_activity") {
    defaulePath = "online.jpg"
  } else {
    defaulePath = "others.jpg"
  }
  const realBDay = new Date(events.date)
  let year = realBDay.getFullYear().toString()
  let month = "0" + (realBDay.getMonth() + 1).toString()
  let date = "0" + realBDay.getDate().toString()
  let hour = "0" + realBDay.getHours().toString()
  let mins = "0" + realBDay.getMinutes().toString()
  const finalDate =
    year + "-" + month.substring(month.length - 2) + "-" + date.substring(date.length - 2)
  const finalTime = hour.substring(hour.length - 2) + ":" + mins.substring(mins.length - 2)

  const image = events.image ? `/${events.image}` : `/${defaulePath}`

  htmlStr += /*html */ `
  <div id="event-left" class="d-flex flex-column">
  <div class="col-md-12"><img class="w-100" src="${image}" alt="..." /></img></div>
    <div class="col-md-12 event-detailsInfo">
     <div class="event-name">${events.name}</div>
       <div id="event-content-text" class="mt-4">
         <div class="time">Date:</div>
         <ul>
         <li>${finalDate}</li>
         </ul>
         <div class="time">Time:</div>
         <ul>
         <li>${finalTime}</li>
         </ul>
         <div class="venue">Venue: </div>
         <ul>
         <li>${events.venue}</li>
         </ul>
         <div class="fee">Fee: </div>
         <ul>
         <li>${Amount}</li>
         </ul>
         <div class="max-pp">Max-participants: </div>
         <ul>
         <li>${events.max_participant}</li>
         </ul>
         <div class="description">Description:</div>
         <ul>
         <li>${events.bio}</li>
         </ul>
      </div>
    </div>
  </div>`
  loadFollower()
  document.querySelector("#event-details").innerHTML = htmlStr
}

async function userProfileInEventDetails(eventid) {
  let htmlProfileCard = document.querySelector("#Profile")
  const profile = await fetch(`/event/organiser?eventid=${eventid}`)
  const userInfo = await profile.json()
  let image = userInfo.profile_img ? userInfo.profile_img : "/profile-pic.jpg"
  console.log(userInfo.bio)
  if (userInfo.bio === null) {
    bio = "這人很懶，什麼也沒有"
  } else {
    bio = userInfo.bio
  }
  htmlProfileCard.innerHTML = `
  <div id="profile-img">
    <img
      src="${image}"
      class="card-img-top w-100 rounded-circle"
      alt="..."
    />
  </div>
  <div class="card-body w-100">
    <div><h5 class="card-title">${userInfo.first_name + " " + userInfo.last_name}</h5></div>
    <p class="card-text">Contact:${userInfo.phone}</p>
    <p class="card-text">Email : ${userInfo.email}</p>
    <p class="card-text">Bio : ${bio}</p>
    <div id="follow-div"><button uid="${userInfo.id
}" class="btn btn-info" id="follow-btn">Follow</button></div>
  </div>
`
  document.querySelector("#follow-btn").addEventListener("click", async (e) => {
    const fid = document.querySelector("#follow-btn").attributes["uid"].value
    const message = await fetch(`/followers?organiserid=${fid}`, {
      method: "POST",
    })
    const realMsg = await message.json()
    alert(realMsg.message)
    loadFollower()
  })
}

// check login or not
async function CheckLoginNow() {
  const resp = await fetch("/createEvent/check")
  const result = await resp.json()
  if (result.success) {
    checkApplied()
  } else {
    needTologin()
  }
}

// check if not login and click apply button
async function needTologin() {
  document.querySelector("#apply-now").addEventListener("click", async function (event) {
    alert("please sign in first!")
    window.location.href = "/signup.html"
  })
}
async function checkAppliedStatus() {
  let applyButton = document.querySelector("#apply-now")
  const eventid = window.location.search.substr(9)
  const resp = await fetch(`/event/approve?eventid=${eventid}`)
  const applyStatus = await resp.json()
  if (applyStatus.approve) {
    applyButton.disabled = true
    applyButton.innerText = "Approved!!"
  } else {
    applyButton.disabled = true
    applyButton.innerText = "pending"
  }
}

// async function checkAppliedStatus() {
//   const eventid = window.location.search.substr(9)
//   const resp = await fetch(`/event/checkAppliedStatus?eventid=${eventid}`)
//   const applyStatus = await resp.json()
//   // return processed = false which means user applied but not being accepted
//   // console.log(applyStatus)
// }

async function checkApplied() {
  let applyButton = document.querySelector("#apply-now")
  const eventid = window.location.search.substr(9)
  const resp = await fetch(`/event/checkApply?eventid=${eventid}`)
  const applyStatus = await resp.json()

  if (applyStatus.success === true) {
    await checkAppliedStatus()
  } else if (applyStatus.success === false) {
    // have ac and not applied
    // click button to insert data
    applyButton.addEventListener("click", async function (event) {
      event.preventDefault()
      const eventid = window.location.search.substr(9)
      const getEvent = await fetch(`/event/singleEvent?eventid=${eventid}`)
      const resultGetEvent = await getEvent.json()
      const organiserid = resultGetEvent.organiser_id
      const response = await fetch(`/event/applyButton`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          organiserid,
          eventid,
        }),
      })
      const result = await response.json()
      if (result.success) {
        alert("Joined")
        applyButton.disabled = true
        applyButton.innerText = "Pending"
      } else {
        if (result.message) {
          alert(result.message)
        } else {
          alert("fail")
        }
      }
    })
  }
}

// report function
async function promptEvent() {
  const login = await fetch(`/status`)
  const loginStatus = await login.json()
  if (!loginStatus.login) {
    alert("please sign in first!")
    window.location.href = "/signup.html"
    return
  }
  let reportReason = ""
  reportReason = prompt("May i have the Reasons?")
  if (!reportReason) {
    alert("Sorry, I haven't get your msg")
  }

  const eventid = window.location.search.substr(9)
  const resp = await fetch(`/event/reports`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      eventid,
      reportReason,
    }),
  })
  const result = await resp.json()
  if (!result.success) {
    alert("please sign in first!")
    window.location.href = "/signup.html"
  } else {
    alert("you have reported")
  }
}

// follow function
async function loadFollower() {
  const login = await fetch(`/status`)
  const loginStatus = await login.json()
  if (!loginStatus.login) {
    document.querySelector("#follow-div").innerHTML = ""
    return
  } else {
    const uid = await document.querySelector("#follow-btn").attributes["uid"].value
    const followingJson = await fetch(`/followers/check?followerID=${uid}`)
    const following = await followingJson.json()
    if (following.success) {
      document.querySelector("#follow-btn").innerHTML = "Unfollow"
    } else {
      document.querySelector("#follow-btn").innerHTML = "Follow"
    }
  }
}

// comment function
// document.querySelector("#commentForm").addEventListener("submit", async function (event) {
//   event.preventDefault()

//   const eventID = window.location.search.substr(9)
//   const form = event.target
//   const comment = form.comment.value
//   console.log(eventID)

//   const res = await fetch("/comment", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ comment, eventID }),
//   })

//   const result = await res.json()
//   if (result.success) {
//     const eventid = window.location.search.substr(9)
//     loadComment(eventid)
//   } else {
//     alert("Fail to comment")
//   }
// })

async function loadComment(eventid) {
  const resp = await fetch("/createEvent/check")
  const result = await resp.json()
  if (result.success) {
    // have ac, show comment
    await addComment(eventid)
    return
  } else {
    // no ac, not gonna show comment
    const HTML = `<div id="no-login-msg" class="text-center">Please login to see comment</div>`
    document.querySelector("#Comment-Area").innerHTML = HTML

    const DisableHTML = ""
    document.querySelector("#commentForm").innerHTML = DisableHTML
  }
}

async function addComment(eventid) {
  const resp = await fetch(`/comment?eventid=${eventid}`)
  const Checkresults = await resp.json()
  const results = Checkresults.result

  if (Checkresults.success) {
    let html = ""
    for (const result of results) {
      const realBDay = new Date(result.created_at)
      let year = realBDay.getFullYear().toString()
      let month = "0" + (realBDay.getMonth() + 1).toString()
      let date = "0" + realBDay.getDate().toString()
      let hour = "0" + realBDay.getHours().toString()
      let mins = "0" + realBDay.getMinutes().toString()
      const finalDate =
        year +
        "-" +
        month.substring(month.length - 2) +
        "-" +
        date.substring(date.length - 2) +
        " (" +
        hour.substring(hour.length - 2) +
        ":" +
        mins.substring(mins.length - 2) +
        ")"

      let image = result.profile_img ? result.profile_img : "/profile-pic.jpg"

      html += `<div class="d-flex flex-column">
    <div id ="user"> 
    <p>    <img
    src="${image}"
    alt=""
    class="rounded-circle me-2"
    width="32"
    height="32"
  />${result.last_name} ${result.first_name} posted on ${finalDate}</p>
    </div>
    <div id="postedComment" class="mb-5">
    ${result.comment}
    </div>
    </div>
    `
    }
    document.querySelector("#Comment-Area").innerHTML = html
  } else {
    let area = await document.querySelector("#Comment-Area").innerHTML
    area = "<p>No Comment Yet</p>"
  }
}

function HideComment() {
  const HTML = `<div id="no-login-msg" class="text-center">Please login to see comment</div>`
  document.querySelector("#Comment-Area").innerHTML = HTML

  const DisableHTML = ""
  document.querySelector("#commentForm").innerHTML = DisableHTML
}
