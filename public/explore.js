window.onload = async () => {
  await getUserInfo()
}

async function getUserInfo() {
  const resp = await fetch("/explore/getUser")
  if (resp.status === 200) {
    const result = await resp.json()
    user = result.user
    loadEventsWithAc()
  } else {
    postAllEvents()
    disableTitle()
  }
}

async function loadEventsWithAc() {
  const resp = await fetch("event/FollowerEvent")
  const results = await resp.json()
  let htmlStr = ``
  for (const result of results) {
    if (result.fee === 0) {
      Amount = "Free"
    } else {
      Amount = `HKD${result.fee}`
    }

    if (result.type === "sport") {
      defaulePath = "sports.jpg"
    } else if (result.type === "board_game") {
      defaulePath = "board-game.jpg"
    } else if (result.type === "water_activities") {
      defaulePath = "water.jpg"
    } else if (result.type === "gaming") {
      defaulePath = "gambling.jpg"
    } else if (result.type === "party") {
      defaulePath = "party.jpg"
    } else if (result.type === "workshop") {
      defaulePath = "workshop.jpg"
    } else if (result.type === "online_activities") {
      defaulePath = "online.jpg"
    } else {
      defaulePath = "others.jpg"
    }
    const image = result.image ? `/${result.image}` : `/${defaulePath}`
    const realBDay = new Date(result.date)
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

    htmlStr +=
      /*html*/
      `
      <div class="col-md-4" data-id="${result.id}">
      <div class="card" data-id="${result.id}">
      <img src = "${image}" class="card-img-top" />

      <div class="card-body" data-id="${result.id}">
        <h5 class="card-title">${result.name}</h5>
        <p class="card-text">
          Date: ${finalDate}<br>
          Location: ${result.venue}<br>
          Fee: ${Amount}
        </p>
        </div>
    </div>
    </div>
    `
  }
  document.querySelector("#cardArea").innerHTML = htmlStr

  document.querySelectorAll(".card").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
      const id = e.target.parentElement.dataset.id
      const resp = await fetch(`/event/details/${id}`, { method: "GET" })
      if (resp.status === 400) {
        const result = await resp.json()
        alert(result.message)
      }
    })
  )
  await postAllEvents()
}

async function postAllEvents() {
  const resp = await fetch("/event/allEvents")
  const results = await resp.json()
  let htmlStr = ""
  for (const result of results) {
    if (result.fee === 0) {
      Amount = "Free"
    } else {
      Amount = `HKD${result.fee}`
    }

    if (result.type === "sport") {
      defaulePath = "sports.jpg"
    } else if (result.type === "board_game") {
      defaulePath = "board-game.jpg"
    } else if (result.type === "water_activities") {
      defaulePath = "water.jpg"
    } else if (result.type === "gaming") {
      defaulePath = "gambling.jpg"
    } else if (result.type === "party") {
      defaulePath = "party.jpg"
    } else if (result.type === "workshop") {
      defaulePath = "workshop.jpg"
    } else if (result.type === "online_activities") {
      defaulePath = "online.jpg"
    } else {
      defaulePath = "others.jpg"
    }
    const path = result.image
    const realBDay = new Date(result.date)
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

    const image = result.image ? `/${path}` : `/${defaulePath}`

    htmlStr += /*html*/ `
    <div class="col-md-4" data-id="${result.id}">
    <div class="card" data-id="${result.id}">
    <img src = "${image}" class="card-img-top" />

    <div class="card-body" data-id="${result.id}" >
      <h5 class="card-title">${result.name}</h5>
      <p class="card-text">
        Date: ${finalDate}<br>
        Location: ${result.venue}<br>
        Fee: ${Amount}
      </p>
      </div>
  </div>
  </div>
  `
  }
  document.querySelector("#allEvent").innerHTML = htmlStr

  document.querySelectorAll(".card").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
      const id = e.target.parentElement.dataset.id
      // const resp = await fetch(`/event/details?id=${id}`, { method: "GET" })
      window.location.href = `/event-details.html?eventid=${id}`
    })
  )
}

document.querySelector("#explore").addEventListener("click", () => {
  window.location.href = "/explore"
})

// async function CheckLogin() {
//   const resp = await fetch("/createEvent/check")
//   const result = await resp.json()
//   if (result.success) {
//     window.location.href = "/createEvent.html"
//   } else {
//     window.location.href = "/signup.html"
//     alert("Please sign in first")
//   }
// }

// document.querySelector("#create-event").addEventListener("click", () => {
//   CheckLogin()
// })

async function disableTitle() {
  document.querySelector("#FollowTitle").innerHTML = ""
}
