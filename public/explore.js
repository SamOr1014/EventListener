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
    console.log(result)
    if (result.fee === 0) {
      Amount = "Free"
    } else {
      Amount = `HKD${result.fee}`
    }

    if (result.type === "Sport") {
      defaulePath = "sports.jpg"
    } else if (result.type === "Board_game") {
      defaulePath = "board-game.jpg"
    } else if (result.type === "Water_activity") {
      defaulePath = "water.jpg"
    } else if (result.type === "Gambling") {
      defaulePath = "gambling.jpg"
    } else if (result.type === "Party") {
      defaulePath = "party.jpg"
    } else if (result.type === "Workshop") {
      defaulePath = "workshop.jpg"
    } else if (result.type === "Online_activity") {
      defaulePath = "online.jpg"
    } else {
      defaulePath = "others.jpg"
    }
    const image = result.image ? `/${result.image}` : `/${defaulePath}`
    htmlStr +=
      /*html*/
      `
      <div class="card" style="width: 18rem" data-id="${result.id}">
      <img src = "${image}" class="card-img-top" />

      <div class="card-body" >
        <h5 class="card-title">${result.name}</h5>
        <p class="card-text">
          Date: ${result.date}<br>
          Location: ${result.venue}<br>
          Fee: ${Amount}
        </p>
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

    if (result.type === "Sport") {
      defaulePath = "sports.jpg"
    } else if (result.type === "Board_game") {
      defaulePath = "board-game.jpg"
    } else if (result.type === "Water_activity") {
      defaulePath = "water.jpg"
    } else if (result.type === "Gambling") {
      defaulePath = "gambling.jpg"
    } else if (result.type === "Party") {
      defaulePath = "party.jpg"
    } else if (result.type === "Workshop") {
      defaulePath = "workshop.jpg"
    } else if (result.type === "Online_activity") {
      defaulePath = "online.jpg"
    } else {
      defaulePath = "others.jpg"
    }
    const path = result.image;

    const image = result.image ? `/${path}` : `/${defaulePath}`

    htmlStr += /*html*/ `   
    <div class="card" style="width: 18rem" data-id="${result.id}">

    <img src = "${image}" class="card-img-top" />

    <div class="card-body" >
      <h5 class="card-title">${result.name}</h5>
      <p class="card-text">
        Date: ${result.date}<br>
        Location: ${result.venue}<br>
        Fee: ${Amount}
      </p>
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
  document.querySelector("#FollowTitle").innerHTML = ''
}

