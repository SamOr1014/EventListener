
async function getData() {
    const category = localStorage.getItem("category")
    const url = `./.......?category=${category}`

    // method: "GET"
    // backend >> req.query
    const dataJson = await fetch(url)
    const data = await data.json()

    // manage html
    const dataBoard = document.querySelector("#content")
    const htmlStr = `<div> ${data.name}, ${data.image} </div>`
    dataBoard.innerHTML = htmlStr
} 

getData()