function addHeaderEventListeners(){
    //###############
    //Event listeners
    //###############
    //search bar on header
    document.querySelector('#header-search').addEventListener('submit', (event) => {
        event.preventDefault()
        const searchword = event.target.searchbar.value
        window.location.href = `/search?keyword=${searchword}`
    })
}    

async function loadHeaderAccountButton(){
    
}

addHeaderEventListeners()