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
  document.querySelector("#result-type").innerHTML = `<h2><u><strong>${genre[0].toUpperCase()+genre.substring(1)}</strong><u></h2>`;
  const resp = await fetch(`/search/genres?genre=${genre}`);
  const results = await resp.json()

  let htmlStr = "";
  for (const result of results) {
    // }
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
    const path = result.image;

    const image = result.image? `/${path}` : `/${defaultPath}`

    htmlStr = 
     /*html*/
     `
    <div class="col-md-3 mt-3">
     <div class="card" data-id="${result.id}">
     <img src = "${image}" class="card-img-top" />

     <div class="card-body" >
       <h5 class="card-title">${result.name}</h5>
       <p class="card-text">
         Date: ${result.date}<br>
         Location: ${result.venue}<br>
         Fee: ${result.fee}
       </p>
       </div>
   </div>
   </div>
   `
   document.querySelector("#content-board").innerHTML += htmlStr;
  }
  

}

// async function loadSelectedEvent() {

// }
// loadSelectedEvent();

async function loadkeyword(keyword) {
  console.log("keyword",keyword)
  document.querySelector("#result-type").innerHTML = `<h2>${keyword}</h2>`;

  const resp = await fetch(`/search/keyword?keyword=${keyword}`);
  const results = await resp.json()
  console.log(results)
  let htmlStr = "";
  for (const result of results) {
    // }
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
    const path = result.image;

    const image = result.image? `/${path}` : `/${defaultPath}`

    htmlStr = 
     /*html*/
     `
    <div class="col-md-3 mt-3">
     <div class="card" data-id="${result.id}">
     <img src = "${image}" class="card-img-top" />

     <div class="card-body" >
       <h5 class="card-title">${result.name}</h5>
       <p class="card-text">
         Date: ${result.date}<br>
         Location: ${result.venue}<br>
         Fee: ${result.fee}
       </p>
       </div>
   </div>
   </div>
   `
   document.querySelector("#content-board").innerHTML += htmlStr;
  }
  
}


window.onload = () => {
  loadSearchResult()
}
