window.onload = async () => {
  console.log("Texting1")
  await getUserInfo();
  // true if has ac
  // const isLoggedIN = !!user;

  console.log("Final texting")
}


async function getUserInfo() {
  const resp = await fetch("/account/getUser");
  if (resp.status === 200) {
    const result = await resp.json();
    user = result.user;
    loadEventsWithAc();
  } else {
    postAllEvents();
  }
}

async function loadEventsWithAc() {
  console.log(user.ID)
  console.log(user.username)
}

async function postAllEvents() {
  console.log("No AC so will show all contents")
  const resp = await fetch("/event/allEvents")
  const results = await resp.json()
  let htmlStr = "";
  for (const result of results) {
    console.log(`Testing${result}`)
    htmlStr += /*html*/ `   
    <div class="card" style="width: 18rem">
    <img
      src=".././test-image/gambling.jpg"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body" data-id="${result.id}">
      <h5 class="card-title">${result.name}</h5>
      <p class="card-text">
        Date:${result.date}<br>
        Location:${result.venue}<br>
        Fee:${result.fee}
      </p>
      </div>
  </div>
`;

  }
  document.querySelector("#allEvent").innerHTML = htmlStr;

  document.querySelectorAll(".card-body").forEach((ele) =>
  ele.addEventListener("click", async (e) => {
    const id = e.target.parentElement.dataset.id;
    console.log(id)
    const resp = await fetch(`/event/${id}`, { method: "GET" });
    if (resp.status === 400) {
      const result = await resp.json();
      alert(result.message);
    }
  })
);  
}

