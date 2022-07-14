async function loadAllUsersAdmin(){
    const usersFromServer = await fetch('/account/alluserdetail', {
        method: 'GET'
    })
    const usersDetail = await usersFromServer.json()
    document.querySelector('#showing-panel').innerHTML = ""
    document.querySelector('#showing-panel').innerHTML += `<div class="col-md-12 text-center" id="title">USERS PANEL</div>`
    for (let user of usersDetail){
        let statusButton = user.is_banned? "Unban":"Ban"
        let buttonClass = user.is_banned? "primary":"danger"
        if (user.is_admin){
          document.querySelector('#showing-panel').innerHTML += `<div class="col-md-4 user-cards mb-2" userid="">
          <div class="card">
            <div class="card-body">
              <p class="card-title">Name: ${user.first_name + " " + user.last_name}</p>
              <p class="card-text">Email: ${user.email}</p>
              <p class="card-text">Phone: ${user.phone}</p>
              <p class="card-text">User ID: ${user.id}</p>
              <a userid="${user.id}" class="btn btn-secondary">Can't Ban Admin</a>
            </div>
          </div>
      </div>
      `
        } else {
        document.querySelector('#showing-panel').innerHTML += `<div class="col-md-4 user-cards mb-2" userid="">
        <div class="card">
          <div class="card-body">
            <p class="card-title">Name: ${user.first_name + " " + user.last_name}</p>
            <p class="card-text">Email: ${user.email}</p>
            <p class="card-text">Phone: ${user.phone}</p>
            <p class="card-text">User ID: ${user.id}</p>
            <a userid="${user.id}" class="btn btn-${buttonClass} ${statusButton}-btn">${statusButton}</a>
          </div>
        </div>
    </div>
    `
    }
  }
    addEventListenerToBan()
}

async function addEventListenerToBan(){
  document.querySelectorAll('.Ban-btn').forEach((btn)=>{
    btn.addEventListener('click', async (e)=> {
      console.log('clicked ban button')
      let userToBeBam = e.target.attributes['userid'].value
      const banMessage = await fetch(`/admin/users/ban-status?banid=${userToBeBam}`,{
        method: 'PUT'
      })
      console.log((await banMessage.json()).updateBan)
      loadAllUsersAdmin()
    })

  })
  document.querySelectorAll('.Unban-btn').forEach((btn)=>{
    btn.addEventListener('click', async (e)=> {
      console.log('clicked ban button')
      let userToBeBam = e.target.attributes['userid'].value
      const banMessage = await fetch(`/admin/users/ban-status?banid=${userToBeBam}`,{
        method: 'PUT'
      })
      console.log((await banMessage.json()).updateBan)
      loadAllUsersAdmin()
    })
  })
}


loadAllUsersAdmin()

