console.log("testing")

window.onload = () => {
  adjustTime()
}

function adjustTime() {
  let today = new Date()
  let day = String(today.getDate()).padStart(2, "0")
  let month = String(today.getMonth() + 1).padStart(2, "0")
  let year = today.getFullYear()
  today = year + "-" + month + "-" + day
  const updateTime = `<input type="date" id="eventDate" name="eventDate" min = ${today} required>`
  document.querySelector("#eventDate").innerHTML = updateTime
}

function disableFee(fee) {
  if (fee.value == 0) {
    document.getElementById("fee").disabled = false
  } else {
    document.getElementById("fee").disabled = true
  }
}

document.querySelector("#createEvent").addEventListener("submit", async function (event) {
  event.preventDefault()

  const form = event.target
  const formData = new FormData()
  formData.append("eventName", form.eventName.value)
  formData.append("type", form.type.value)
  formData.append("eventDate", form.eventDate.value)
  formData.append("eventTime", form.eventTime.value)
  formData.append("participants", form.participants.value)
  formData.append("venue", form.venue.value)
  formData.append("Fee", form.Fee.value)
  formData.append("content", form.content.value)
  formData.append("image", form.image.files[0])

  const res = await fetch("/event", {
    method: "POST",
    body: formData,
  })

  const result = await res.json()
  if (result.success) {
    alert("Event Created")
    window.location.href = "/index.html"
  } else {
    alert("Fail")
  }
})

document.querySelector("#explore").addEventListener("click", () => {
  window.location.href = "/explore"
})

document.querySelector("#create-event").addEventListener("click", () => {
  location.reload()
})
