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
  console.log("genre",genre)
}

async function loadkeyword(keyword) {
  console.log("keyword",keyword)
}

loadSearchResult()
