window.onload = async () => {
  const eventid = window.location.search.substr(9)
  console.log(eventid)
  await CheckLogin()
  await loadEventDetails(eventid)
  await userProfileInEventDetails(eventid)
  await loadComment(eventid)
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
  const realBDay = new Date(events.date)
  const finalDate =
    realBDay.getFullYear().toString() +
    "-" +
    (realBDay.getMonth() + 1).toString() +
    "-" +
    realBDay.getDate().toString() +
    " " +
    realBDay.getHours().toString() +
    ":" +
    realBDay.getMinutes().toString()
  const image = events.image ? `/${events.image}` : `/${defaulePath}`

  htmlStr += /*html */ `
  <div id="event-left">
   <img src="${image}" width="100%" alt="..." />
    <div class="event-detailsInfo">
     <div class="event-name">Event Name: ${events.name}</div>
       <div id="event-content-text">
         <div class="time">Time:${finalDate}</div>
         <ul>
         <li></li>
         </ul>
         <div class="venue">Venue: ${events.venue}</div>
         <ul>
         <li></li>
         </ul>
         <div class="fee">Fee: ${Amount}</div>
         <ul>
         <li></li>
         </ul>
         <div class="max-pp">Max-participants: ${events.max_participant}</div>
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
    checkApplied()
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
  // if applied return {success:true}
  // if not applied return {success:false}
  console.log(applyStatus)
  // let applyButton = document.querySelector("#apply-now")
  // have ac and applied
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
      console.log(result.success)
      if (result.success) {
        alert("Joined")
        applyButton.disabled = true
        applyButton.innerText = "Pending"
      } else {
        alert("fail")
      }
    })
  }
}

// report function
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

// comment function
document.querySelector("#commentForm").addEventListener("submit", async function (event) {
  event.preventDefault()

  const eventID = window.location.search.substr(9)
  const form = event.target
  const comment = form.comment.value
  console.log(eventID)

  const res = await fetch("/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment, eventID }),
  })

  const result = await res.json()
  if (result.success) {
    alert("Comment Created")
    location.reload()
  } else {
    alert("Fail to comment")
  }
})

async function loadComment(eventid) {
  const resp = await fetch("/createEvent/check")
  const result = await resp.json()
  if (result.success) {
    // have ac, show comment
    addComment(eventid)
  } else {
    // no ac, not gonna show comment
    HideComment()
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
      const finalDate =
        realBDay.getFullYear().toString() +
        "-" +
        (realBDay.getMonth() + 1).toString() +
        "-" +
        realBDay.getDate().toString() +
        " " +
        "(" +
        realBDay.getHours().toString() +
        ":" +
        realBDay.getMinutes().toString() +
        ")"
      console.log(result)
      html += `
    <div id = "user"> 
    <p>${result.last_name} ${result.first_name} posted on ${finalDate}</p>
    </div>
    <div id = "postedComment">
    <p>${result.comment}
    </p>
    </div>
    `
    }
    document.querySelector("#Comment-Area").innerHTML = html
  } else {
    document.querySelector("#Comment-Area").innerHTML = "<p>No Comment Yet</p>"
  }
}

async function HideComment() {
  const HTML = `<p>Please login to see comment</p>`
  document.querySelector("#Comment-Area").innerHTML = HTML

  const DisableHTML = ""
  document.querySelector("#commentForm").innerHTML = DisableHTML
}
