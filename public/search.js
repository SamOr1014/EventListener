async function loadSearchResult() {
  let type = window.location.search
  type = type.replace("?", "")
  let typeArr = type.split("=")
  if (typeArr[0] === "genre") {
    loadgenre(typeArr[1])
  } else if (typeArr[0] === "keyword") {
    loadkeyword(typeArr[1])
  }
}

async function loadgenre(genre) {
  let genreWord = genre[0].toUpperCase() + genre.substring(1)
  genreWord = genreWord.replace("_", " ")
  document.querySelector("#result-type").innerHTML = `"${
    genreWord
  }"`
  const resp = await fetch(`/search/genres?genre=${genre}`)
  const results = await resp.json()
  if (results === null){
    document.querySelector('#content-board').innerHTML += `<div id="null-result" class="text-center">No Result</div>`
  }
  let htmlStr = ""
  for (const result of results) {
    const realBDay = new Date(result.date)
    let year = realBDay.getFullYear().toString()
    let month = ("0" + (realBDay.getMonth() + 1).toString())
    let date = ("0" + realBDay.getDate().toString())
    let hour = ("0" +realBDay.getHours().toString())
    let mins = ("0" + realBDay.getMinutes().toString())
    const finalDate = year + "-" + month.substring(month.length-2) + "-" + date.substring(date.length-2)
    const finalTime = hour.substring(hour.length-2) + ":" + mins.substring(mins.length-2)

    if (result.type === "sport") {
      defaultPath = "sports.jpg"
    } else if (result.type === "board_game") {
      defaultPath = "board-game.jpg"
    } else if (result.type === "water_activities") {
      defaultPath = "water.jpg"
    } else if (result.type === "gaming") {
      defaultPath = "gambling.jpg"
    } else if (result.type === "party") {
      defaultPath = "party.jpg"
    } else if (result.type === "workshop") {
      defaultPath = "workshop.jpg"
    } else if (result.type === "online_activities") {
      defaultPath = "online.jpg"
    } else {
      defaultPath = "others.jpg"
    }
    const path = result.image

    const image = result.image ? `/${path}` : `/${defaultPath}`

    htmlStr =
      /*html*/
      `
    <div class="col-md-3 mt-3" data-id="${result.id}">
     <div class="card" data-id="${result.id}">
     <img src = "${image}" class="card-img-top" />

     <div class="card-body" data-id="${result.id}">
       <h5 class="card-title">${result.name}</h5>
       <p class="card-text">
         Date: ${finalDate}<br>
         Location: ${result.venue}<br>
         Maximum participants: ${result.max_participant}<br>
         Fee: ${result.fee}
       </p>
       </div>
   </div>
   </div>
   `
    document.querySelector("#content-board").innerHTML += htmlStr
  }
  document.querySelectorAll(".card").forEach((ele) => {
    ele.addEventListener("click", async (e) => {
      const id = e.target.parentElement.dataset.id
      // const resp = await fetch(`/event/details?id=${id}`, { method: "GET" })
      window.location.href = `/event-details.html?eventid=${id}`
    })
  })
}

async function loadkeyword(keyword) {
  document.querySelector("#result-type").innerHTML = `"${keyword}"`

  const resp = await fetch(`/search/keyword?keyword=${keyword}`)
  const results = await resp.json()
  if (results === null){
    document.querySelector('#content-board').innerHTML += `<div id="null-result" class="text-center">No Result</div>`
  }
  let htmlStr = ""
  for (const result of results) {
    const realBDay = new Date(result.date)
    let year = realBDay.getFullYear().toString()
    let month = ("0" + (realBDay.getMonth() + 1).toString())
    let date = ("0" + realBDay.getDate().toString())
    let hour = ("0" +realBDay.getHours().toString())
    let mins = ("0" + realBDay.getMinutes().toString())
    const finalDate = year + "-" + month.substring(month.length-2) + "-" + date.substring(date.length-2)
    const finalTime = hour.substring(hour.length-2) + ":" + mins.substring(mins.length-2)
    
    if (result.type === "sport") {
      defaultPath = "sports.jpg"
    } else if (result.type === "board_game") {
      defaultPath = "board-game.jpg"
    } else if (result.type === "water_activities") {
      defaultPath = "water.jpg"
    } else if (result.type === "gaming") {
      defaultPath = "gambling.jpg"
    } else if (result.type === "party") {
      defaultPath = "party.jpg"
    } else if (result.type === "workshop") {
      defaultPath = "workshop.jpg"
    } else if (result.type === "online_activities") {
      defaultPath = "online.jpg"
    } else {
      defaultPath = "others.jpg"
    }
    const path = result.image

    const image = result.image ? `/${path}` : `/${defaultPath}`

    htmlStr =
      /*html*/
      `
    <div class="col-md-4 mt-3" data-id="${result.id}">
     <div class="card" data-id="${result.id}">
     <img src = "${image}" class="card-img-top" />

     <div class="card-body" data-id="${result.id}">
       <h5 class="card-title">${result.name}</h5>
       <p class="card-text">
         Date: ${finalDate}<br>
         Location: ${result.venue}<br>
         Maximum participants: ${result.max_participant}<br>
         Fee: ${result.fee}
       </p>
       </div>
   </div>
   </div>
   `
    document.querySelector("#content-board").innerHTML += htmlStr
  }
  document.querySelectorAll(".card").forEach((ele) => {
    ele.addEventListener("click", async (e) => {
      const id = e.target.parentElement.dataset.id
      // const resp = await fetch(`/event/details?id=${id}`, { method: "GET" })
      window.location.href = `/event-details.html?eventid=${id}`
    })
  })
}

window.onload = () => {
  loadSearchResult()
}
