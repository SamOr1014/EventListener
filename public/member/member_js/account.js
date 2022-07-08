//functions
async function loadUserProfile(){
    let htmlProfileCard = document.querySelector('#profile-info')
    const profile = await fetch(`/account/userdetail`, {
        method: 'GET'
    })
    const userInfo = await profile.json()
    console.log(userInfo)
    htmlProfileCard.innerHTML = ''
    htmlProfileCard.innerHTML += `            <img
    src=""
    class="card-img-top w-100 rounded-circle"
    alt=""
  />
  <div class="card-body">
    <div><h5 id="profile-name" class="card-title">${userInfo.first_name+ " "+ userInfo.last_name}</h5></div>
    <div id="profile-birthday" class="card-text mb-2">Birthday :${userInfo.birthday}</div>
    <div id="profile-email" class="card-text mb-2">Email :${userInfo.email}</div>
    <div class="card-text mb-2">Bio :</div>
    <div id="profile-bio" class="card-text mb-2">${userInfo.bio}</div>
  </div>`
}

async function loadFollowers(){
    let htmlFollowersList = document.querySelector('#follower-list')
    let userID = 1
    const followers = await fetch(`/followers`, {
        method: 'GET'
    })
    const followersInfo = await followers.json()
    for (let followers of followersInfo){
      let fullName = followers.first_name + " " + followers.last_name
      htmlFollowersList.innerHTML += `<li>${fullName}</li>`
    }
}

loadUserProfile()
loadFollowers()