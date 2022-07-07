//functions
async function loadUserProfile(){
    let htmlProfileCard = document.querySelector('#profile-info')
    const profile = await fetch('/account', {
        method: 'GET'
    })
    const userInfo = await profile.json()
    htmlProfileCard.innerHTML = ''
    htmlProfileCard.innerHTML += `            <img
    src="${}"
    class="card-img-top w-100 rounded-circle"
    alt="event picture"
  />
  <div class="card-body">
    <div><h5 id="profile-name" class="card-title">${}</h5></div>
    <div id="profile-birthday" class="card-text mb-2">Birthday :${}</div>
    <div id="profile-email" class="card-text mb-2">Email :${}</div>
    <div class="card-text mb-2">Bio :</div>
    <div id="profile-bio" class="card-text mb-2">${}</div>
  </div>`
}

async function loadFollowers(){
    let htmlFollowerCard = document.querySelector('#follower-list')
    const followers = await fetch('/followers', {
        method: 'GET'
    })
    const followersInfo = await followers.json()
    for (let follower in followersInfo){
        htmlFollowerCard.innerHTML += `<li>${}</li>`
    }
     
}

window.onload = ()=>{

}