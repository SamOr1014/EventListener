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
  console.log(user.ID)
  console.log(user.username)
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
    } else if (result.type === "water_activity") {
      defaulePath = "water.jpg"
    } else if (result.type === "gambling") {
      defaulePath = "gambling.jpg"
    } else if (result.type === "party") {
      defaulePath = "party.jpg"
    } else if (result.type === "workshop") {
      defaulePath = "workshop.jpg"
    } else if (result.type === "online_activity") {
      defaulePath = "online.jpg"
    } else {
      defaulePath = "others.jpg"
    }
    const image = result.image ? `/${result.image}` : `/${defaulePath}`
    const realBDay = new Date(result.date)
    const finalDate =
      realBDay.getFullYear().toString() +
      "-" +
      (realBDay.getMonth() + 1).toString() +
      "-" +
      realBDay.getDate().toString() +
      " " +
      "(" +
      ("0" + realBDay.getHours().toString()).substring(-2) +
      ":" +
      ("0" + realBDay.getMinutes().toString()).substring(-2) +
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
      console.log(id)
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
    console.log(result)
    if (result.fee === 0) {
      Amount = "Free"
    } else {
      Amount = `HKD${result.fee}`
    }

    if (result.type === "sport") {
      defaulePath = "sports.jpg"
    } else if (result.type === "board_game") {
      defaulePath = "board-game.jpg"
    } else if (result.type === "water_activity") {
      defaulePath = "water.jpg"
    } else if (result.type === "gambling") {
      defaulePath = "gambling.jpg"
    } else if (result.type === "party") {
      defaulePath = "party.jpg"
    } else if (result.type === "workshop") {
      defaulePath = "workshop.jpg"
    } else if (result.type === "online_activity") {
      defaulePath = "online.jpg"
    } else {
      defaulePath = "others.jpg"
    }
    const path = result.image
    const realBDay = new Date(result.date)
    const finalDate =
      realBDay.getFullYear().toString() +
      "-" +
      (realBDay.getMonth() + 1).toString() +
      "-" +
      realBDay.getDate().toString() +
      " " +
      "(" +
      ("0" + realBDay.getHours().toString()).substring(-2) +
      ":" +
      ("0" + realBDay.getMinutes().toString()).substring(-2) +
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
      console.log(id)
      // const resp = await fetch(`/event/details?id=${id}`, { method: "GET" })
      window.location.href = `/event-details.html?eventid=${id}`
    })
  )
}

document.querySelector("#explore").addEventListener("click", () => {
  window.location.href = "/explore"
})

async function CheckLogin() {
  const resp = await fetch("/createEvent/check")
  const result = await resp.json()
  if (result.success) {
    window.location.href = "/createEvent.html"
  } else {
    window.location.href = "/signup.html"
    alert("Please sign in first")
  }
}

document.querySelector("#create-event").addEventListener("click", () => {
  CheckLogin()
})

async function disableTitle() {
  document.querySelector("#FollowTitle").innerHTML = ""
}
