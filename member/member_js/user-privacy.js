async function loadPrivacyProfilePage(){
    let userID = 1
    let htmlProfileCard = document.querySelector('#profile-info')
    const profile = await fetch(`/account/userdetail?userid=${userID}`, {
        method: 'GET'
    })
    const userInfo = await profile.json()
    let image = userInfo.profile_img ? userInfo.profile_img: "/profile-pic.jpg"
    const realBDay = new Date(userInfo.birthday)
    let year = realBDay.getFullYear().toString()
    let month = ("0" + (realBDay.getMonth() + 1).toString())
    let date = ("0" + realBDay.getDate().toString())
    let hour = ("0" +realBDay.getHours().toString())
    let mins = ("0" + realBDay.getMinutes().toString())
    const finalDate = year + "-" + month.substring(month.length-2) + "-" + date.substring(date.length-2)
    const finalTime = hour.substring(hour.length-2) + ":" + mins.substring(mins.length-2)
    if (userInfo.bio === null) {
        bio = "這人很懶，什麼也沒有"
      } else {
        bio = userInfo.bio
      }

    document.querySelector('#profile-name').innerHTML = `<h2>${userInfo.first_name + " " + userInfo.last_name}</h2>`
    document.querySelector('#pf-pic').src = image
    document.querySelector('#b-day').innerHTML += " "+finalDate
    document.querySelector('#cur-user-id').innerHTML += " "+userInfo.id
    document.querySelector('#bio').innerHTML = bio
    document.querySelector('#email').innerHTML = userInfo.email
    document.querySelector('#phone').innerHTML += " " + userInfo.phone
    document.querySelector('#gender').innerHTML += " " + userInfo.gender

    //load modal with original value
    document.querySelector('#change-first-name').value = userInfo.first_name
    document.querySelector('#change-last-name').value = userInfo.last_name

    document.querySelector('#change-birthday').value = finalDate
    document.querySelector('#change-phone').value = userInfo.phone
    document.querySelector('#change-user-bio').value = userInfo.bio

    //load form event Listeners
    loadEventListenerPrivacyPage()
}

async function loadEventListenerPrivacyPage() {
    //profile change
    document.querySelector('#profile-change').addEventListener("submit", async (e) => {
        e.preventDefault()

        const form = e.target

        const firstName = form['first-name'].value
        const lastName = form['last-name'].value
        const phone = form['phone'].value
        const birthday = form['birthday'].value
        const bio = form['bio'].value

        const submitChangeProfile = await fetch("/account/profile",{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                phone,
                birthday,
                bio,
            }), 
        })
        const submitResponese = await submitChangeProfile.json()
        if (submitResponese.success){
            alert('Detail Changed')
            window.location.reload()
        } else {
            alert(`${submitResponese.message}`)
        }
    })
    //email change
    document.querySelector('#email-change').addEventListener('submit', async (e)=> {
        e.preventDefault()
        const form = e.target

        const newEmail = e.target['email'].value
        const confirmedEmail = e.target['confirm-email'].value
        console.log(newEmail,"," ,confirmedEmail)
        if (newEmail !== confirmedEmail){
            alert("Please make sure confirm email is the same to the new email!")
        }
        const submitChangeProfile = await fetch("/account/email",{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newEmail,
                confirmedEmail,
            }),
        })
        const submitResponese = await submitChangeProfile.json()
        if (submitResponese.success){
            alert('Email Changed')
            window.location.reload()
            return
        }else {
            alert(`${submitResponese.message}`)
            return
        }
    })
    //password changes
    document.querySelector('#pw-change').addEventListener('submit', async (e)=> {
        e.preventDefault()
        console.log("clicked pw change")
        const form = e.target

        const newPw = e.target['password'].value
        const confirmedPw = e.target['confirm-password'].value
        console.log(newPw,"," ,confirmedPw)
        if (newPw !== confirmedPw){
            alert("Please make sure confirm password is the same to the new password!")
        }
        const submitChangeProfile = await fetch("/account/password",{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newPw,
                confirmedPw,
            }),
        })
        const submitResponese = await submitChangeProfile.json()

        if (submitResponese.success){
            alert('Password Changed')
            window.location.href = '/logout'
            return
        }else {
            alert(`${submitResponese.message}`)
            return
        }
    })
}


loadPrivacyProfilePage()