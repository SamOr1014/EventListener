document.querySelectorAll(".card").forEach(function (element) {
    element.addEventListener("click", (e) => {
        const category = e.currentTarget.querySelector("div").innerText
        localStorage.setItem("category", category)
        window.location.href = "./search.html"
    })
})