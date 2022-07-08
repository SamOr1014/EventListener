async function loadAllUsersAdmin(){
    const usersFromServer = await fetch('/account/alluserdetail', {
        method: 'GET'
    })
    const usersDetail = await usersFromServer.json()
    console.log(usersDetail);
    for (let user of usersDetail){
        let statusButton = user.is_banned? "Unban":"Ban"
        let buttonClass = user.is_banned? "danger":"primary"
        document.querySelector('#showing-panel').innerHTML = `<div class="col-md-3 user-cards" userid="">
        <div class="card">
          <div class="card-body">
            <p class="card-title">Name: ${user.first_name + " " + user.last_name}</p>
            <p class="card-text">Email: ${user.email}</p>
            <p class="card-text">Phone: ${user.phone}</p>
            <p class="card-text">User ID: ${user.id}</p>
            <a id="${statusButton}-button" class="btn btn-${buttonClass}">${statusButton}</a>
          </div>
        </div>
    </div>
    `
    }
}


loadAllUsersAdmin()



console.log('loading all users')

