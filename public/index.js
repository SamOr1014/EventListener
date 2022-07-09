
document.querySelectorAll(".card").forEach(function (element) {
    element.addEventListener("click", (e) => {
        const category = e.currentTarget.querySelector("div").innerText
        localStorage.setItem("category", category)
        window.location.href = "./search.html"
    })
})


document.querySelector('#explore').addEventListener('click', () => {
    window.location.href = '/explore'
})


async function CheckLogin() {
    const resp = await fetch("/createEvent/check");
    const result = await resp.json();
    if (result.success) {
        window.location.href = "/createEvent.html"
    } else {
        window.location.href = "/signup.html"
        alert("Please sign in first")
    }
}

document.querySelector('#create-event').addEventListener('click', () => {
    CheckLogin()
   
})

    
