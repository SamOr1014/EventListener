async function loadPrivacyProfile(){
    let userID = 1
    let htmlProfileCard = document.querySelector('#profile-info')
    const profile = await fetch(`/account/userdetail?userid=${userID}`, {
        method: 'GET'
    })
    const userInfo = await profile.json()
    console.log(userInfo)
    document.querySelector('#profile-name').innerHTML = `<h2>${userInfo.first_name + " " + userInfo.last_name}</h2>`
    document.querySelector('#b-day').innerHTML += userInfo.birthday
    document.querySelector('#cur-user-id').innerHTML += userInfo.id
    document.querySelector('#bio').innerHTML = userInfo.bio
    document.querySelector('#email').innerHTML = userInfo.email
    document.querySelector('#phone').innerHTML += " " + userInfo.phone
    document.querySelector('#gender').innerHTML += " " + userInfo.gender
}

async function loadEventListenerPrivacyPage() {

}


loadPrivacyProfile()