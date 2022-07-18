window.onload = () => {
  adjustTime()
}

function adjustTime() {
  let today = new Date()
  let day = String(today.getDate()).padStart(2, "0")
  let month = String(today.getMonth() + 1).padStart(2, "0")
  let year = today.getFullYear()
  today = year + "-" + month + "-" + day
  const updateTime = `<input type="date" id="birthday" name="birthday" max = ${today} required />`
  document.querySelector("#eventDate").innerHTML = updateTime
}

document.querySelector("#createAc").addEventListener("submit", async function (event) {
  event.preventDefault()

  const form = event.target

  const FirstName = form.firstName.value
  const LastName = form.lastName.value
  const Gender = form.Gender.value
  const DOA = form.birthday.value
  const Phone = form.phoneNumber.value
  const Email = form.email.value
  const password = form.password.value
  const isAdmin = false
  const isBanned = false

  const res = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FirstName,
      LastName,
      Gender,
      DOA,
      Phone,
      Email,
      password,
      isAdmin,
      isBanned,
    }),
  })
  const result = await res.json()
  if (result.success) {
    alert("Account created")
    window.location.href = "/index.html"
  } else {
    alert("Error, account registered")
  }
})

document.querySelector("#login").addEventListener("submit", async function (event) {
  event.preventDefault()

  const form = event.target
  const email = form.email.value
  const password = form.password.value

  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const result = await res.json()
  if (result.success) {
    alert("Login Success")
    window.location.href = "/index.html"
  } else {
    if (result.message === "banned") {
      alert("U are Bammed")
    } else {
      alert("Login failed")
    }
  }
})
