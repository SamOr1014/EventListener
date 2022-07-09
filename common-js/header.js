function addHeaderEventListeners(){
    //###############
    //Event listeners
    //###############
    //search bar on header
    document.querySelector('#header-search').addEventListener('submit', async (event) => {
        event.preventDefault()
        const searchword = event.target.searchbar.value
        const searchKeyword = await fetch (`/search/keyword?keyword=${searchword}`, {
          method: "GET"
        })
        console.log(await searchKeyword.json())
        // window.location.href = `/search`

    })

}    
function addHeaderAccountListenerFalse() {
      //add to those login status false button
      document.querySelector('#login-button-header').addEventListener('click', ()=> {
        window.location.href = '/login'
      })
      document.querySelector('#signup-button-header').addEventListener('click', ()=> {
        window.location.href = '/login'
      })
}

function addHeaderAccountListenerTrue(){
    //add to those login status true button
    document.querySelector('#account-detail').addEventListener('click', ()=> {
      window.location.href = '/account'
    })
    document.querySelector('#logout').addEventListener('click', ()=> {
      window.location.href = '/logout'
    })
}

async function loadHeaderAccountButton(){
    //check the login status first
    const status = await fetch('/status', {
        method: 'GET'
    })
    const userLoginStatus = await status.json()
    console.log(userLoginStatus.login)
    //true fetch user's profile and get his profile pic and name
    if(userLoginStatus.login){
        //the login status is true so load the user profile
        const userInfoFromServer = await fetch('/account/userdetail', {
            method: 'GET'
        })
        let userInfo = await userInfoFromServer.json()
        let image
        if (!userInfo.profile_img){
          image = "/profile-pic.jpg"
        }
        else {
          image = userInfo.profile_img
        }
        //insert the three buttons
        let buttons = !userInfo.is_admin?`        <button
        id="account-detail" 
        type="button"
        class="btn btn-outline-light me-2"
      >
        Account
      </button>
      <button id="logout" type="button" class="btn btn-warning">
        Log Out
      </button>
      <div id="user-menu">
        <a
          href="#"
          class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="user-icon"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="${image}"
            alt=""
            class="rounded-circle me-2"
            width="32"
            height="32"
          />
          <strong>${userInfo.first_name + " " + userInfo.last_name}</strong>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="user-icon"
        >
          <li>
            <a id="profile" class="dropdown-item" href="/account">Profile</a>
          </li>
          <li>
            <a id="created" class="dropdown-item" href="/account/created">Created</a>
          </li>
          <li>
            <a id="joined" class="dropdown-item" href="/account/joined">Joined</a>
          </li>
          <li>
            <a id="request" class="dropdown-item" href="/account/request">Request</a>
          </li>
          <li>
            <a id="privacy" class="dropdown-item" href="/account/privacy"
              >Privacy Setting</a
            >
          </li>
        </ul>
      </div>`: `        <button
      id="account-detail" 
      type="button"
      class="btn btn-outline-light me-2"
    >
      Account
    </button>
    <button id="logout" type="button" class="btn btn-warning">
      Log Out
    </button>
    <div id="user-menu">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        id="user-icon"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="${image}"
          alt=""
          class="rounded-circle me-2"
          width="32"
          height="32"
        />
        <strong>${userInfo.first_name + " " + userInfo.last_name}</strong>
      </a>
      <ul
        class="dropdown-menu dropdown-menu-dark text-small shadow"
        aria-labelledby="user-icon"
      >
        <li>
          <a id="all-users" class="dropdown-item" href="/admin/users">Users</a>
        </li>
        <li>
          <a id="all-events" class="dropdown-item" href="/admin/events">Events</a>
        </li>
        <li>
          <a id="all-reports" class="dropdown-item" href="/admin/reports">Reports</a>
        </li>
      </ul>
    </div>`
      document.querySelector('#account').innerHTML = buttons
      addHeaderEventListeners()
      addHeaderAccountListenerTrue()
    }
    else {
        let buttons = `            <button type="button" id="login-button-header" class="btn btn-outline-light me-2">
        Log in
      </button>
      <button type="button" id="signup-button-header" class="btn btn-warning">
        Sign up
        </button>`
        document.querySelector('#account').innerHTML = buttons
        addHeaderEventListeners()
        addHeaderAccountListenerFalse()
    }
}

loadHeaderAccountButton()
console.log("You loaded header.js")
