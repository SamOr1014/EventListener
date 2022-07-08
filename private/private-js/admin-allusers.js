async function loadAllEventAdmin(){
    const eventsFromServer = await fetch('/account//userdetail', {
        method: 'GET'
    })
    const eventsDetail = await eventsFromServer.json()
    console.log(eventsDetail);
    for (let event of eventsDetail){
        document.querySelector('#showing-panel').innerHTML = ``
    }
}


loadAllEventAdmin()



console.log('loading all event')

