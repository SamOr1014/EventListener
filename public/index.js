async function addEventListenerToGenre(){
    document.querySelector('#boardgame-pic').addEventListener('click', (e)=> {
        window.location.href = "/search.html?genre=1"
    })
}

addEventListenerToGenre()

document.querySelector('#explore').addEventListener('click', () => {
    window.location.href = '/explore'
})


async function CheckLogin() {
    const resp = await fetch("/createEvent/check");
    const result = await resp.json();
    if (result.success) {
        window.location.href = "/createEvent.html"
    } else {
        alert("Please sign in first")
        window.location.href = "/signup.html"
    }
}

document.querySelector('#create-event').addEventListener('click', () => {
    CheckLogin()
})

    
