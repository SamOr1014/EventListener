async function addEventListenerToGenre() {
  document.querySelector("#boardgame-pic").addEventListener("click", (e) => {
    window.location.href = "/search.html?genre=board_game"
  })
  document.querySelector("#workshop-pic").addEventListener("click", (e) => {
    window.location.href = "/search.html?genre=workshop"
  })
  document.querySelector("#party-pic").addEventListener("click", (e) => {
    window.location.href = "/search.html?genre=party"
  })
  document.querySelector("#sport-pic").addEventListener("click", (e) => {
    window.location.href = "/search.html?genre=sport"
  })
  document.querySelector("#water-pic").addEventListener("click", (e) => {
    window.location.href = "/search.html?genre=water_activities"
  })
  document.querySelector("#online-pic").addEventListener("click", (e) => {
    window.location.href = "/search.html?genre=online_activities"
  })
  document.querySelector("#gaming-pic").addEventListener("click", (e) => {
    window.location.href = "/search.html?genre=gaming"
  })
  document.querySelector("#other-pic").addEventListener("click", (e) => {
    window.location.href = "/search.html?genre=others"
  })
}

function loadTItleAnimation() {
  console.log("loaded title")
  const signs = document.querySelectorAll("x-sign")
  const randomIn = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const mixupInterval = (el) => {
    const ms = randomIn(2000, 4000)
    el.style.setProperty("--interval", `${ms}ms`)
  }

  signs.forEach((el) => {
    mixupInterval(el)
    el.addEventListener("webkitAnimationIteration", () => {
      mixupInterval(el)
    })
  })
}

addEventListenerToGenre()
loadTItleAnimation()

document.querySelector("#explore").addEventListener("click", () => {
  window.location.href = "/explore"
})

// async function CheckLogin() {
//   const resp = await fetch("/createEvent/check")
//   const result = await resp.json()
//   if (result.success) {
//     window.location.href = "/createEvent.html"
//   } else {
//     alert("Please sign in first")
//     window.location.href = "/signup.html"
//   }
// }

// document.querySelector("#create-event").addEventListener("click", () => {
//   CheckLogin()
// })
